import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("Res from some route");
console.log('object')
});

export default router;
