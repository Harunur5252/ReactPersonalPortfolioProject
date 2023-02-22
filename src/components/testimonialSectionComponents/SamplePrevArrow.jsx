import { useContext } from "react";
import { PageContext } from "../context/Page.Context";

 function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    const {colorData} = useContext(PageContext)
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: colorData?.colorName }}
        onClick={onClick}
      />
    );
}

export default SamplePrevArrow