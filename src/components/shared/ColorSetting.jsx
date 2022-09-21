import React from 'react'

function ColorSetting() {
  return (
    <>
        <div className="color-panel">
			<div className="on-panel color_white bg_primary">
				<div className="text-center icon-spinner">
					<i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
				</div>
			</div>
			<div className="panel-box">
				<span className="panel-title">Theme Colors</span>
				<ul className="color-box">
					<li
						className="default"
						data-name="default"
						data-path="css/color.css"
						data-image="images/logo/1.png"
						data-target="images/logo/1.png"
					></li>
					<li
						className="color_2"
						data-name="color_2"
						data-path="css/color/color-1.css"
						data-image="images/logo/2.png"
						data-target="images/logo/2.png"
					></li>
					<li
						className="color_3"
						data-name="color_3"
						data-path="css/color/color-2.css"
						data-image="images/logo/3.png"
						data-target="images/logo/3.png"
					></li>
					<li
						className="color_4"
						data-name="color_4"
						data-path="css/color/color-3.css"
						data-image="images/logo/4.png"
						data-target="images/logo/4.png"
					></li>
					<li
						className="color_5"
						data-name="color_5"
						data-path="css/color/color-4.css"
						data-image="images/logo/5.png"
						data-target="images/logo/5.png"
					></li>
					<li
						className="color_6"
						data-name="color_6"
						data-path="css/color/color-5.css"
						data-image="images/logo/6.png"
						data-target="images/logo/6.png"
					></li>
					<li
						className="color_7"
						data-name="color_7"
						data-path="css/color/color-6.css"
						data-image="images/logo/7.png"
						data-target="images/logo/7.png"
					></li>
					<li
						className="color_8"
						data-name="color_8"
						data-path="css/color/color-7.css"
						data-image="images/logo/8.png"
						data-target="images/logo/8.png"
					></li>
					<li
						className="color_9"
						data-name="color_9"
						data-path="css/color/color-8.css"
						data-image="images/logo/9.png"
						data-target="images/logo/9.png"
					></li>
					<li
						className="color_10"
						data-name="color_10"
						data-path="css/color/color-9.css"
						data-image="images/logo/10.png"
						data-target="images/logo/10.png"
					></li>
					<li
						className="color_11"
						data-name="color_11"
						data-path="css/color/color-10.css"
						data-image="images/logo/11.png"
						data-target="images/logo/11.png"
					></li>
					<li
						className="color_12"
						data-name="color_12"
						data-path="css/color/color-11.css"
						data-image="images/logo/12.png"
						data-target="images/logo/12.png"
					></li>
					<li
						className="color_13"
						data-name="color_13"
						data-path="css/color/color-12.css"
						data-image="images/logo/13.png"
						data-target="images/logo/13.png"
					></li>
					<li
						className="color_14"
						data-name="color_14"
						data-path="css/color/color-13.css"
						data-image="images/logo/14.png"
						data-target="images/logo/14.png"
					></li>
				</ul>
			</div>
			<div className="switcher_layout">
				<span className="layout_title">Layout Style</span>
				<div className="radio_check">
					<input type="checkbox" id="layout_type" name="layout" value="Yes" />
					<label className="bg_default text-left" htmlFor="layout_type"
						><span className="white_color">Full</span
						><span className="secondary_color">Box</span></label
					>
				</div>
			</div>
			<div className="template_style">
				<span className="layout_title">Template Style</span>
				<ul>
					<li>
						<a className="btn_link" href="index-7.html" target="blank"
							>White Version</a
						>
					</li>
					<li>
						<a className="btn_link" href="index-8.html" target="blank"
							>Black Version</a
						>
					</li>
				</ul>
			</div>
			<div className="box_bg_style">
				<span className="layout_title">Background pattern</span>
				<div className="select_bg">
					<ul>
						<li>
							<input
								type="radio"
								name="radio"
								id="patrn1"
								value="pattern_1"
							/><label htmlFor="patrn1" className="radios pattern1"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="patrn2"
								value="pattern_2"
							/><label htmlFor="patrn2" className="radios pattern2"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="patrn3"
								value="pattern_3"
							/><label htmlFor="patrn3" className="radios pattern3"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="patrn4"
								value="pattern_4"
							/><label htmlFor="patrn4" className="radios pattern4"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="patrn5"
								value="pattern_5"
							/><label htmlFor="patrn5" className="radios pattern5"></label>
						</li>
					</ul>
				</div>
				<span className="layout_title">Background pattern</span>
				<div className="select_bg">
					<ul>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img1"
								value="body_bg_1"
							/><label htmlFor="bg_img1" className="radios body_image1"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img2"
								value="body_bg_2"
							/><label htmlFor="bg_img2" className="radios body_image2"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img3"
								value="body_bg_3"
							/><label htmlFor="bg_img3" className="radios body_image3"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img4"
								value="body_bg_4"
							/><label htmlFor="bg_img4" className="radios body_image4"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img5"
								value="body_bg_5"
							/><label htmlFor="bg_img5" className="radios body_image5"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img6"
								value="body_bg_6"
							/><label htmlFor="bg_img6" className="radios body_image6"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img7"
								value="body_bg_7"
							/><label htmlFor="bg_img7" className="radios body_image7"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img8"
								value="body_bg_8"
							/><label htmlFor="bg_img8" className="radios body_image8"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img9"
								value="body_bg_9"
							/><label htmlFor="bg_img9" className="radios body_image9"></label>
						</li>
						<li>
							<input
								type="radio"
								name="radio"
								id="bg_img10"
								value="body_bg_10"
							/><label htmlFor="bg_img10" className="radios body_image10"></label>
						</li>
					</ul>
				</div>
				<div className="select_bg">
					<ul>
						<li>
							<input type="checkbox" name="runaway" id="bg_over" value="" />
							Overlay
						</li>
					</ul>
				</div>
			</div>
		</div>
    </>
  )
}

export default ColorSetting