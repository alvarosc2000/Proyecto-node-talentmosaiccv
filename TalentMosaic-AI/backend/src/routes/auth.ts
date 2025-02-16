import express from "express";
import axios from "axios";
import { LINKEDIN_CONFIG } from "../config/linkedin";

const router = express.Router();

router.get("/linkedin", (req, res) => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CONFIG.clientId}&redirect_uri=${LINKEDIN_CONFIG.redirectUri}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  res.redirect(authUrl);
});

export default router;
