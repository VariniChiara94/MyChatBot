from loguru import logger
import os

def end_task(input_data, output_data, settings):
    logger.info("end_task called")
    pass

async def save_files(input_data, files, settings):
    logger.info("save_files called")
    # Save uploaded files to /data/resources
    save_dir = settings.common_config_path
    os.makedirs(save_dir, exist_ok=True)
    for file in files:
        file_location = os.path.join(save_dir, file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())
    pass