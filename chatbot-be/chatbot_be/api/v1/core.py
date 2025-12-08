from functools import lru_cache
from typing import Annotated, List

from fastapi import APIRouter, BackgroundTasks, Depends, Query, UploadFile, File

from chatbot_be.config import Settings, get_settings
from chatbot_be.models.commons import AppResponse
from chatbot_be.models.schemas.core.compute_models import ComputeRequest, ComputeDataResponse, ComputeParams
from chatbot_be.models.schemas.core.get_models import GetDataResponse, GetParams
from chatbot_be.models.schemas.core.set_models import SetRequest, SetDataResponse, SetParams
from chatbot_be.middleware.pipeline.core.compute_pipeline import get_core_pipeline
from chatbot_be.utils.utils import end_task, save_files
from chatbot_be.utils import status_code

core_router = APIRouter(
    prefix="/api/v1/core",
    tags=["core"],
)


@lru_cache(maxsize=10)
@core_router.post("/compute/multipart")
async def core_compute(
    req: ComputeRequest,
    files: List[UploadFile] = File(...),
    core_pipeline=Depends(get_core_pipeline),
    settings: Settings = Depends(get_settings)
) -> AppResponse[ComputeDataResponse]:
    """
    Handles the computation request for the core pipeline.

    Args:
        req (ComputeRequest): The request object containing the user message to be processed and the LLM engine to be used.
        files (List[UploadFile]): The list of uploaded files.
        core_pipeline: Dependency injection for the core pipeline instance.
        settings (Settings): Application settings.

    Returns:
        AppResponse[ComputeDataResponse]: A response object containing the computation results.
    """
    req_json = req.model_dump()
    try:
        await save_files(req_json, files, settings)
        data_clean = await core_pipeline.data_quality(req_json)
        data_preprocessed = await core_pipeline.preprocess_input(data_clean)
        model_result = await core_pipeline.get_model_result(data_preprocessed)
        out = await core_pipeline.prepare_output(model_result, req)
        output_data = ComputeDataResponse(**out)
    except Exception as e:
        end_task(req_json, {f"Error 500: {repr(e)}"}, settings)
        raise e

    return AppResponse[ComputeDataResponse](data=output_data,
                                            details="Endpoint /api/v1/core/compute endend successfully",
                                            app_status_code=status_code.APP_200_OK)

@core_router.post("/compute")
async def core_compute(
    req: ComputeRequest,
    core_pipeline=Depends(get_core_pipeline),
    settings: Settings = Depends(get_settings)
) -> AppResponse[ComputeDataResponse]:
    """
    Handles the computation request for the core pipeline.

    Args:
        req (ComputeRequest): The request object containing the user message to be processed and the LLM engine to be used.
        core_pipeline: Dependency injection for the core pipeline instance.
        settings (Settings): Application settings.

    Returns:
        AppResponse[ComputeDataResponse]: A response object containing the computation results.
    """
    req_json = req.model_dump()
    try:
        data_clean = await core_pipeline.data_quality(req_json)
        data_preprocessed = await core_pipeline.preprocess_input(data_clean)
        model_result = await core_pipeline.get_model_result(data_preprocessed)
        out = await core_pipeline.prepare_output(model_result, req)
        output_data = ComputeDataResponse(**out)
    except Exception as e:
        end_task(req_json, {f"Error 500: {repr(e)}"}, settings)
        raise e

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
