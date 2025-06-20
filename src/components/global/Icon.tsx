import React, { FC } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


interface IconProps {
    color?: string;
    size: number;
    name: string;
    iconFamily: "FontAwesome" | "MaterialIcons" | "Ionicons" | "AntDesign" | "Feather"|"MaterialCommunityIcons";
}
const Icon: FC<IconProps> = ( { color, size, name, iconFamily } ) => {
    return (
        <>
            { iconFamily === "FontAwesome" && <FontAwesome name={ name } size={ size } color={ color } /> }
            { iconFamily === "MaterialIcons" && <MaterialIcons name={ name } size={ size } color={ color } /> }
            { iconFamily === "Ionicons" && <Ionicons name={ name } size={ size } color={ color } /> }
            { iconFamily === "AntDesign" && <AntDesign name={ name } size={ size } color={ color } /> }
             { iconFamily === "Feather" && <Feather name={ name } size={ size } color={ color } /> }
              { iconFamily === "MaterialCommunityIcons" && <MaterialCommunityIcons name={ name } size={ size } color={ color } /> }
        </>
    )
}

export default Icon