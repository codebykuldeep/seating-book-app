import React, { useState } from "react";
import classes from "./otpverify.module.css";
import { Box, Button, Typography } from "@mui/material";
import { OtpInput } from "reactjs-otp-input";
import { apiCall } from "../../../utils/httpMethods";
import ShowSnackbar from "../common/ShowSnackBar";
import useSnack from "../../../helper/useSnack";
import { setToken } from "../../../helper/utilityfn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userActions } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  email: string;
}

function OtpVerify({ email }: Props) {
    const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { snackState, snackOpen, snackClose } = useSnack();
  const [otp, setOtp] = useState("");
  const [submit, setSubmit] = useState(false);
  const handleChange = (otp: string) => setOtp(otp);

  async function handleSubmit() {
    if (otp.length !== 4) return;

    setSubmit(true);
    const response = await apiCall("POST", "verify-otp", null, {
      email,
      code: otp,
    });
    if (response.success) {
      const user = response.user;
      const token = response.token;
      setToken(token);
      dispatch(userActions.setUser(user));
      snackOpen(true, "success","Login Successful , Redirecting...");
      setTimeout(()=>navigate('/'),3000)
      return;
    } else {
      snackOpen(true, "error", response.message);
    }
    setSubmit(false);
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography>OTP Verification</Typography>
        <Typography variant="caption">
          Please enter 4 digit otp sent to your email
        </Typography>
      </Box>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={4}
        separator={<span>-</span>}
        inputStyle={classes.otp_box}
        isDisabled={submit}
      />
      <Box className={classes.btn}>
        <Button
          variant="contained"
          onClick={() => setOtp("")}
          disabled={submit}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          loading={submit}
          loadingPosition="end"
        >
          Proceed
        </Button>
      </Box>
      <ShowSnackbar state={snackState} closeFn={snackClose} />
    </Box>
  );
}

export default OtpVerify;
