import $ from "jquery";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Fieldpermissions from "./Fieldpermissions";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Spinner from "./Spinner";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
// App.js
export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
    };
  }
  handleChange = (event) => {};
  loginCalled = (event) => {};
  handleDrawerOpen = () => {
    this.setState({ drawer: true });
  };
  handleDrawerClose = () => {
    this.setState({ drawer: false });
  };
  render() {
    const open = this.state.drawer != null && this.state.drawer ? true : false;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon onClick={this.handleDrawerOpen} />
            </IconButton>
            <Typography variant="h6">Admin Control</Typography>
          </Toolbar>
        </AppBar>
        <Fieldpermissions />
        <div>
          <Drawer variant="temporary" anchor="left" open={open}>
            <div>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
        <div>
          {this.props.data.data.visibility.spinner ? <Spinner></Spinner> : ""}
        </div>
        <div></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state,
});
const mapDispatchToProps = {};
const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);
export default MainContainer;
