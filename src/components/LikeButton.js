/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "../likehand.svg";

const LikeButton = () => {
	const [liked, setLiked] = useState(null);

	return (
		<button
			css={styles}
			onClick={() => setLiked(!liked)}
			className={cn("like-button-wrapper", { liked })}
		>
			<div className="like-button">
				<Hand />
				<span>Like</span>
				<span className={cn("suffix", { liked })}>d</span>
			</div>
		</button>
	);
};

const styles = css`
	::before {
		content: "";
		z-index: 1;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		will-change: background-color;
		transition: background-color 0.3s, transform 0.3s;
		background-color: $dark;
		box-shadow: 0 0 10px $darkLower;
		border-radius: 8px;

		&.liked {
			&::before {
				background-color: $primary;
			}
		}

		.suffix {
			opacity: 0;
			transition: opacity 300ms, transform 300ms;
			transform: translateX(15px);

			&.liked {
				opacity: 1;
				transform: translateX(0);
			}
		}
	}
`;

export default LikeButton;
