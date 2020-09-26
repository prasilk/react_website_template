import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const style = makeStyles({
  root: {
    width: "100%",
    minHeight: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    color: "#eef3fd",
    height: 20,
  },
  bottom: {
    color: "#6798e5",
    animationDuration: "550ms",
    height: 20,
    marginLeft: -24,
  },
});

export function CLoader(props) {
  const classes = style();

  return (
    <div className={classes.root}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.top}
          size={24}
          thickness={4}
          {...props}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.bottom}
          size={24}
          thickness={4}
          {...props}
        />
      </div>
    </div>
  );
}
