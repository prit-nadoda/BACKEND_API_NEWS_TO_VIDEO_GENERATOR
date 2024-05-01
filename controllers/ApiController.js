import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

import Creatomate from "creatomate";

export const newVideoRequest = catchAsyncError(async (req, res, next) => {
  const { headLine, imgUrl, dayCount, apiKey } = req.body;
  if (!headLine || !imgUrl || !dayCount || !apiKey) {
    return next(new ErrorHandler("Please provide required Information", 400));
  }
  const client = new Creatomate.Client(apiKey);

  const options = {
    templateId: "beda569d-5b83-4391-a5c5-b8eb14d3e78a",

    modifications: {
      headLine: `${headLine}`,
      imgUrl: `${imgUrl}`,
      blurPhoto: `${imgUrl}`,
      dayCount: `Day ${dayCount} of What Happend in last 24 Hours in the World!`,
    },
  };

  client
    .render(options)
    .then((renders) => {
      res.status(200).json({ success: true, videoInfo: renders });
    })
    .catch((error) => console.error(error));
});
