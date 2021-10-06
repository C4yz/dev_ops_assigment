import {useState} from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';

function TabGroup(probs) {
    const [value, setValue] = useState("one");
    const {labels} = probs;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
            <Tabs
            value= {value}
            onChange={handleChange}
            aria-label="Yeet">
                <Tab
                value="one"
                label={probs.labels[0]}
                wrapped
                />
                <Tab value="two" label={probs.labels[1]} wrapped/>
                <Tab value="three" label={probs.labels[2]} wrapped />

            </Tabs>
    )
}

export default TabGroup;