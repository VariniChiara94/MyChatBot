from httpx import AsyncClient


class HttpClientFactory:
    """Factory class used to create HTTP Client objects."""

    @staticmethod
    def get_async_http_client() -> AsyncClient:
        """
        Method used to get an HTTP Async client.

        :return: the HTTP client.
        """

        return AsyncClient(verify=False)
