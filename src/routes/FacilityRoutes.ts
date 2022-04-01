import { Router } from "express";
import FacilityController from "../controller/FacilityController";
import getAdmin from "../middlewares/GetAdmin";
import validateAdminToken from "../middlewares/ValidateAdminToken";
import MulterSerivce from "../services/Multer";
const router = Router();
var asd = MulterSerivce.upload.single("file");
router.post("/", function (req, res) {
  asd(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);

      return res.json(err);
    }

    // Everything went fine
  });
});
router.patch("/:id", validateAdminToken, getAdmin, MulterSerivce.upload.single("file"), FacilityController.update);
router.delete("/:id", validateAdminToken, getAdmin, FacilityController.delete);
router.get("/", validateAdminToken, getAdmin, FacilityController.getAll);

export default router;
