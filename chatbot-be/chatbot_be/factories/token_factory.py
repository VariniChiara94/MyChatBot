import google.auth.transport.requests
import google.oauth2.id_token


class TokenFactory:
    """Factory Class used to generate Cloud Run Auth token."""

    @staticmethod
    def generate_auth_token(url_audience: str):
        """
        Function used to generate a Google Auth Token.

        :param url_audience: target url to be used as audience.
        :return: the generated google auth token.
        """

        auth_req = google.auth.transport.requests.Request()
        return google.oauth2.id_token.fetch_id_token(auth_req, url_audience)
