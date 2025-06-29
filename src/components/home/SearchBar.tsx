import {View, Text, TouchableOpacity, Pressable, Image} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import RollingContent from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText';
import {useAppDispatch, useAppSelector} from '@states/reduxHooks';
import {setVegMode} from '@states/reducers/userSlice';

const searchItems: string[] = [
  'Search "Chai Samosa"',
  'Search "Cake"',
  'Search "ice cream"',
  'Search "pizza"',
  'Search "Biryani"',
];

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const isVegMode = useAppSelector(state => state.user.isVegMode);

  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();

  const textColorAnimatation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgb(${textColor},${textColor},${textColor})`,
    };
  });
  return (
    <View>
      <View style={[styles.flexRowBetween, styles.padding]}>
        <SafeAreaView />
        <TouchableOpacity
          style={styles.searchInputContainer}
          activeOpacity={0.8}>
          <Icon
            iconFamily="Ionicons"
            name="search"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />

          <RollingContent
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}>
            {searchItems?.map((item, index) => {
              return <CustomText style={styles.rollingText}>{item}</CustomText>;
            })}
          </RollingContent>

          <Icon
            iconFamily="Ionicons"
            name="mic-outline"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />
        </TouchableOpacity>

        <Pressable
          style={styles.vegMode}
          onPress={() => dispatch(setVegMode(!isVegMode))}>
          <Animated.Text style={[textColorAnimatation, styles.animatedText]}>
            VEG
          </Animated.Text>

          <Animated.Text style={[textColorAnimatation, styles.animatedSubText]}>
            VEG
          </Animated.Text>

          <Image
            source={
              isVegMode
                ? require('@assets/icons/switch_on.png')
                : require('@assets/icons/switch_off.png')
            }
            style={styles.switch}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBar;
