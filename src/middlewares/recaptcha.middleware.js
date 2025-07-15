import { ApiError } from "../util/ApiError.js";
import { requestHandeller } from "../util/requestHandeller.js";

export const verifyRecaptcha = (action = "submit") =>
  requestHandeller(async (req, res, next) => {
    const { recaptchaToken } = req.body;
    if (!recaptchaToken) {
      throw new ApiError(400, "Recaptcha response is required");
    }

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        }
      );

      const data = await response.json();
      if (!data.success || data.score < 0.5 || data.action !== action) {
        throw new ApiError(400, "Recaptcha verification failed");
      }

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        "Internal server error during recaptcha verification"
      );
    }
  });
