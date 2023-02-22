import Tippy from "@tippyjs/react";
import axios from "axios";
import React, { useContext } from "react";
import { PageContext } from "../context/Page.Context";
function ColorSetting() {
  const { handleColorSet } = useContext(PageContext);

  return (
    <>
      <Tippy content={<span>Color Change Setting</span>}>
        <img
          src="/Gear-0.2s-197px.svg"
          data-toggle="modal"
          data-target="#exampleModal"
          className="color-setting"
        />
      </Tippy>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Color Change Setting
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      onClick={(e) => handleColorSet(e, "blue")}
                    >
                      Primary
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button
                      type="button"
                      onClick={(e) => handleColorSet(e, "green")}
                      className="btn btn-success btn-sm"
                    >
                      Success
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button
                      type="button"
                      onClick={(e) => handleColorSet(e, "red")}
                      className="btn btn-danger btn-sm"
                    >
                      Danger
                    </button>
                  </div>
                  <div className="col-sm-4 mt-3">
                    <button
                      type="button"
                      onClick={(e) => handleColorSet(e, "yellow")}
                      className="btn btn-warning btn-sm"
                    >
                      Warning
                    </button>
                  </div>
                  <div className="col-sm-4 mt-3">
                    <button
                      type="button"
                      onClick={(e) => handleColorSet(e, "rgb(16, 236, 239)")}
                      className="btn btn-info btn-sm"
                    >
                      Info
                    </button>
                  </div>
                  <div className="col-sm-4 mt-3">
                    <button
                      type="button"
                      onClick={(e) => handleColorSet(e, "black")}
                      className="btn btn-dark btn-sm"
                    >
                      Dark
                    </button>
                  </div>
                  <div className="col-sm-4 mt-3">
                    <button
                      type="button"
                      onClick={(e) => handleColorSet(e, "rgb(213, 222, 222)")}
                      className="btn btn-light btn-sm"
                    >
                      Light
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColorSetting;
