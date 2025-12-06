from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, Query

from chatbot_be.config import Settings, get_settings
from chatbot_be.models.commons import AppResponse
from chatbot_be.models.schemas.core.compute_models import ComputeRequest, ComputeDataResponse, ComputeParams
from chatbot_be.models.schemas.core.get_models import GetDataResponse, GetParams
from chatbot_be.models.schemas.core.set_models import SetRequest, SetDataResponse, SetParams
from chatbot_be.middleware.pipeline.core.compute_pipeline import get_core_pipeline
from chatbot_be.utils.utils import end_task
from chatbot_be.utils import status_code

core_router = APIRouter(
    prefix="/api/v1/core",
    tags=["core"],
)


@core_router.post("/compute")
async def core_compute(
    req: ComputeRequest,
    params: Annotated[ComputeParams, Query()],
    background_tasks: BackgroundTasks,
    core_pipeline=Depends(get_core_pipeline),
    settings: Settings = Depends(get_settings)
) -> AppResponse[ComputeDataResponse]:
    """
    Handles the computation request for the core pipeline.

    Args:
        req (ComputeRequest): The request object containing input data and metadata.
        params (ComputeParams): Parameters for the computation process.
        background_tasks (BackgroundTasks): FastAPI background tasks for asynchronous operations.
        core_pipeline: Dependency injection for the core pipeline instance.
        settings (Settings): Application settings.

    Returns:
        AppResponse[ComputeDataResponse]: A response object containing the computation results.
    """
    req_json = req.model_dump()
    params_json = params.model_dump()
    try:
        data_clean = await core_pipeline.data_quality(req_json, params_json)
        data_preprocessed = await core_pipeline.preprocess_input(data_clean)
        model_result = await core_pipeline.get_model_result(data_preprocessed)
        out = await core_pipeline.prepare_output(model_result, req)
        background_tasks.add_task(end_task, req_json, out, settings)
    except Exception as e:
        end_task(req_json, {f"Error 500: {repr(e)}"}, settings)
        raise e
    output_data = ComputeDataResponse(**out)
    return AppResponse[ComputeDataResponse](data=output_data,
                                            details="Endpoint /api/v1/core/compute endend successfully",
                                            app_status_code=status_code.APP_200_OK)


@core_router.get("/get")
async def core_get(
    params: Annotated[GetParams, Query()],
    settings: Settings = Depends(get_settings)
) -> AppResponse[GetDataResponse]:
    """
    Handles the GET request to retrieve data.

    Args:
        params (GetParams): Parameters for the GET request.
        settings (Settings): Application settings.

    Returns:
        AppResponse[GetDataResponse]: A response object containing the retrieved data.
    """

    # Simulate data retrieval logic
    response = GetDataResponse(data1="test1",
                               data2="test2")
    return AppResponse(data=response,
                       details="Endpoint /api/v1/core/get endend successfully",
                       app_status_code=status_code.APP_200_OK)



@core_router.post("/set")
async def core_set(
    req: SetRequest,
    params: Annotated[SetParams, Query()],
    settings: Settings = Depends(get_settings)
) -> AppResponse[SetDataResponse]:
    """
    Handles the POST request to set data.

    Args:
        req (SetRequest): The request object containing input data.
        params (SetParams): Parameters for the SET request.
        settings (Settings): Application settings.

    Returns:
        AppResponse[SetDataResponse]: A response object confirming the operation.
    """

    # Simulate data setting logic
    response = SetDataResponse(data1="test1",
                               data2="test2")
    return AppResponse(data=response,
                       details="Endpoint /api/v1/core/set endend successfully",
                       app_status_code=status_code.APP_200_OK)
