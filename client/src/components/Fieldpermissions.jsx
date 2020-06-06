import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
export class Fieldpermissions extends React.Component {
  generateTheMatrix() {
    var ObjectList = [];
    var ProfileList = [];
    var PermissionList = [];
    if (
      this.props.data !== undefined &&
      this.props.data.data !== undefined &&
      this.props.data.data.metadatalist !== undefined
    ) {
      var metadatalist = this.props.data.data.metadatalist;
      console.log("The STATE", this.props);
      metadatalist.forEach((ele) => {
        if (ele.fileName.includes(".object")) {
          ObjectList.push(ele.fullName);
        } else if (ele.fileName.includes(".profile")) {
          ProfileList.push(ele.fullName);
        } else if (ele.fileName.includes(".permissionset")) {
          PermissionList.push(ele.fullName);
        }
      });
      console.log("Selected ", PermissionList);
    }
    var twoList = {};
    twoList.objectsList = ObjectList.sort();
    twoList.profileList = ProfileList.sort();
    twoList.permissionList = PermissionList.sort();
    return twoList;
  }
  handleObjectSelection(event, value) {
    console.log(value);
  }
  render() {
    var listDisplay = this.generateTheMatrix();
    return (
      <div>
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Select Object,Profile and Permission Sets</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={listDisplay.objectsList}
                          filterSelectedOptions={true}
                          getOptionLabel={(option) => option}
                          size="small"
                          onChange={this.handleObjectSelection}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Select Objects"
                              placeholder="Object Name"
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={listDisplay.profileList}
                          filterSelectedOptions={true}
                          getOptionLabel={(option) => option}
                          size="small"
                          onChange={this.handleObjectSelection}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Select Profiles"
                              placeholder="Profile Name"
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={listDisplay.permissionList}
                          filterSelectedOptions={true}
                          getOptionLabel={(option) => option}
                          size="small"
                          onChange={this.handleObjectSelection}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Select Permission Sets"
                              placeholder="Permission Set Name"
                            />
                          )}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state,
});
const mapDispatchToProps = {};
const FieldpermissionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fieldpermissions);
export default FieldpermissionsContainer;
