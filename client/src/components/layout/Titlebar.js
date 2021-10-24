import TabGroup from "../TabGroup";
import useState from 'react';
import { Box } from "@material-ui/core";

const types = ["No Answers", "fucking test", "yeet"];

function Titlebar(props) {
    const {title} = props;

    return(
        <Box
        sx={{
            width: "100%",
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
        }}
        >
            <h1 style={{ color: "white", textAlign: 'left', paddingLeft: "20px" }}>{title} </h1>
            <TabGroup labels={types}/>
        </Box>
            

    )    
}
export default Titlebar;