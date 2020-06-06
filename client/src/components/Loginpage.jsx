import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";

import React from "react";
import { connect } from "react-redux";

export class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUrl: "login.salesforce.com",
    };
  }
  loginCalled = () => {
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginUrl: this.state.loginUrl }),
    };
    fetch("/api/logincall", requestOptions);
  };
  handleChange = (event) => {
    this.setState({ loginUrl: event.target.value });
    console.log(event.target.value);
  };
  handleDrawerOpen = () => {
    this.setState({ drawer: true });
  };
  handleDrawerClose = () => {
    this.setState({ drawer: false });
  };
  render() {
    const open = this.state.drawer != null && this.state.drawer ? true : false;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Typography component="div" align="center">
            <div style={{ alignText: "center", paddingTop: "100px" }}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={this.loginCalled}
              >
                Authorize Org
              </Button>
              <br />
              <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">Organization</FormLabel>
                <RadioGroup
                  aria-label="Org"
                  name="Organization"
                  onChange={this.handleChange}
                  defaultValue="login.salesforce.com"
                >
                  <FormControlLabel
                    value="test.salesforce.com"
                    control={<Radio />}
                    label="Sandbox"
                  />
                  <FormControlLabel
                    value="login.salesforce.com"
                    control={<Radio />}
                    label="Production"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state,
});
const mapDispatchToProps = {};
const LoginpageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loginpage);
export default LoginpageContainer;
