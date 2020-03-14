import React from "react";
import Select from "react-select";
import AlertContainer from "react-alert";
import { RingLoader } from "react-spinners";
import moment from "moment";

import HeaderBar from "../components/HeaderBar";
import TitleSection from "../components/TitleSection";
import routes from "../constants/routes";
import strings from "../constants/strings";
import images from "../images/images";
import * as colors from "../constants/colors";
import * as options from "../constants/options";
import * as NetworkUtils from "../utils/NetworkUtils";
import * as Utils from "../utils/Utils";

import "react-select/dist/react-select.css";
import "./Prayer.scss";

class Next extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phone: "",
      description: "",
      nextSteps: true,
      loading: false
    };
  }

  onConnectFormSubmit() {
    if (this.isFormValid()) {
      if (!this.state.loading) {
        this.setState({ loading: true });
        this.sendToSheets();
      }
    }
  }

  isFormValid() {
    this.hideErrors();
    const { isValid, errors } = Utils.isFormValid(this.state);
    if (!isValid) {
      errors.forEach(error => this.showError(error));
    }
    return isValid;
  }

  sendToSheets() {
    const successHandler = () => {
      this.showSuccess();
    };
    const errorHandler = () => {
      this.showError("An error occurred");
    };
    NetworkUtils.sendToSheets(
      "nextsteps",
      this.state,
      successHandler,
      errorHandler
    );
  }

  hideErrors() {
    this.msg.removeAll();
  }

  showError(msg) {
    this.msg.error(msg, {
      onClose: () => {
        this.setState({ loading: false });
      }
    });
  }

  showSuccess() {
    this.setState({ loading: false });
    this.msg.success("Successfully sent", {
      onClose: () => {
        this.props.history.push(routes.confirm);
      }
    });
  }

  nextSession() {
    const d = new moment();
    while (!(d.date() <= 7 && d.day() == 0)) {
      d.add(1, "d");
    }
    d.add(1, "w");

    return d.format("MMMM Do, YYYY");
  }

  render() {
    return (
      <div className="prayer">
        <AlertContainer ref={a => (this.msg = a)} {...options.ALERT_OPTIONS} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.prayerHeader}
          color={colors.PRAYER_THEME}
        />
        <div className="page-width top-section">
          <TitleSection
            title={strings.prayerTitle}
            description={strings.prayerDescription}
          />

          <hr />
        </div>
        <div className="form-section page-width">
          <form autoComplete="on">
            <h3>CONTACT INFO</h3>
            <label>Name (optional)</label>
            <div className="row">
              <input
                className="left"
                type="text"
                name="full name"
                autoComplete="given-name"
                placeholder="Full name"
                value={this.state.fullName}
                onChange={e => this.setState({ fullName: e.target.value })}
              />
            </div>
            <label>Phone (optional)</label>
            <div className="row">
              <input
                type="number"
                name="phone"
                autoComplete="tel"
                placeholder="4161234567"
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
              />
            </div>
            <hr />

            <label>How can we pray for you?</label>
            <div className="row">
              <textarea type="text" name="prayer request" />
            </div>
            <button
              type="button"
              style={{ backgroundColor: colors.NEXT_THEME }}
              onClick={() => this.onConnectFormSubmit()}
            >
              Sign Me Up For Next Steps
            </button>
          </form>
        </div>
        <div className="disclaimer-section page-width">
          <p>
            Privacy: All prayer requests will only be shared with individuals on
            the prayer team and/or the church leadership team.
          </p>
        </div>
        <div
          className="loading-spinner"
          style={{
            visibility: this.state.loading === true ? "visible" : "hidden"
          }}
        >
          <RingLoader color={colors.NEXT_THEME} loading={true} />
        </div>
      </div>
    );
  }
}

export default Next;
