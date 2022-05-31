export const withErrorHandler = async (req, res, apiFunc) => {
  try {
    await apiFunc(req, res);
  } catch (error) {
    if (IsJsonString(error.message)) {
      if (JSON.parse(error.message).err_code) {
        res.status(JSON.parse(error.message).err_code).send(JSON.parse(error.message).err_code + "_" + JSON.parse(error.message).message);
      }
    }
    console.log("Error- " + req.baseUrl + error);
    res.status(500).send(error.message);
  }
};

function IsJsonString(str) {
  try {
    let json = JSON.parse(str);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
}