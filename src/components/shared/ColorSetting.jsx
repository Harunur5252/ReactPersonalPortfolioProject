import Tippy from "@tippyjs/react";
import axios from "axios";
import React, { useContext } from "react";
import { PageContext } from "../context/Page.Context";
function ColorSetting() {
  const { handleColorSet, colorData } = useContext(PageContext);

  return (
    <>
      <Tippy content={<span>Color Change Setting</span>}>
        <img
          src="/Gear-0.2s-197px.svg"
          data-toggle="modal"
          data-target="#exampleModal1"
          className="color-setting"
          style={{ backgroundColor: colorData?.colorName }}
        />
      </Tippy>

      <div
        className="modal fade"
        id="exampleModal1"
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
                  <div className="col-sm-1">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "blue",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={(e) => handleColorSet(e, "blue")}
                    ></div>
                  </div>
                  <div className="col-sm-1">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "green",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={(e) => handleColorSet(e, "green")}
                    ></div>
                  </div>
                  <div className="col-sm-1">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "red",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={(e) => handleColorSet(e, "red")}
                    ></div>
                  </div>
                  <div className="col-sm-1">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "yellow",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={(e) => handleColorSet(e, "yellow")}
                    ></div>
                  </div>
                  <div className="col-sm-1">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(16, 236, 239)",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={(e) => handleColorSet(e, "rgb(16, 236, 239)")}
                    ></div>
                  </div>
                  <div className="col-sm-1">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "black",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={(e) => handleColorSet(e, "black")}
                    ></div>
                  </div>
                  <div className="col-sm-1">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(213, 222, 222)",
                        height: "25px",
                        width: "25px",
                      }}
                      onClick={(e) => handleColorSet(e, "rgb(213, 222, 222)")}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                style={{
                  backgroundColor: "rgb(6, 65, 38)",
                  color:'white',
                  cursor: "pointer",
                  width: "80px",
                }}
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
