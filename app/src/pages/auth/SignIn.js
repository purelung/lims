import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../contexts/UserContext";

import avatar from "../../assets/img/avatars/avatar.jpg";

const SignIn = () => {
  const { setUserData } = useContext(UserContext);
  let history = useHistory();

  const responseGoogle = (response) => {
    console.log(response);

    //https://zeereportingapi.azurewebsites.net
    //http://localhost:7071
    fetch("https://zeereportingapi.azurewebsites.net/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: response.tokenId,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA");
        console.log(data);
        setUserData({
          authToken: data.token,
          name: response.profileObj.name,
          email: response.profileObj.email,
          imageUrl: response.profileObj.imageUrl,
        });
        history.push("/dashboard/store-data/sales");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Problem authentication.  Check console logs.  TODO: make this a toast"
        );
      });
  };

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        {/* <h2>Welcome back, Chris</h2> */}
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Card>
        <CardBody>
          <div className="m-sm-4">
            {/* <div className="text-center">
              <img
                src={avatar}
                alt="Chris Wood"
                className="img-fluid rounded-circle"
                width="132"
                height="132"
              />
            </div> */}
            <Form>
              {/* <FormGroup>
                <Label>Email</Label>
                <Input
                  bsSize="lg"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  bsSize="lg"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <small>
                  <Link to="/auth/reset-password">Forgot password?</Link>
                </small>
              </FormGroup> */}
              {/* <div>
                <CustomInput
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me next time"
                  defaultChecked
                />
              </div> */}
              <div className="text-center mt-3">
                <GoogleLogin
                  clientId="736706520895-rc52mtp1882sl8oss2o65oab8e5p7mr8.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                {/* <Button
                color="primary"
                size="lg"
                onClick={() =>
                  (window.location.href =
                    "/.auth/login/google?post_login_redirect_uri=%2Fdashboard%2Fstore-data%2Fsales")
                }
              >
                Sign in
              </Button> */}
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default SignIn;
