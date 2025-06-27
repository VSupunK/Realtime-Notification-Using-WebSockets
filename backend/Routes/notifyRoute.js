const router = require("express").Router();
const auth = require("../middleware/auth");
const notifyController = require("../Controllers/noifyController");

router.post("/notify", auth, notifyController);

router.delete("/notify/:id", auth, notifyController.removeNotify);

router.get("/notifies", auth, notifyController.getNotifies);

router.patch("/isReadNotify/:id", auth, notifyController.isReadNotify);

router.delete("/removeNotify/:id", auth, notifyController.deleteAllNotifies);

module.exports = router;
