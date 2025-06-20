import {
  View,
  Text,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ExploreList from './ExploreList';
import RestaurantList from './RestaurantList';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '@unistyles/restuarantStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import BackToTopButton from '@components/ui/BackToTopButton';

const sectionedData = [
  {title: 'Explore', data: [{}], renderItem: () => <ExploreList />},
  {title: 'Restaurants', data: [{}], renderItem: () => <RestaurantList />},
];

const MainList: FC = () => {
  const {styles} = useStyles(restaurantHeaderStyles);
  const {scrollY, scrollToTop, scrollYGlobal} = useSharedState();
  const previousScrollYTopButton = useRef<number>(0);
  const prevScrollY = useRef<number>(0);
  const sectionListRef = useRef<SectionList>(null);

  const [isRestaurantvisible, setisRestaurantvisible] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset?.y;
    const isScrollingDown = currentScrollY > prevScrollY?.current;

    scrollY.value = isScrollingDown
      ? withTiming(1, {duration: 300})
      : withTiming(0, {duration: 300});

    scrollYGlobal.value = currentScrollY;
    prevScrollY.current = currentScrollY;

    const containerHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
    const offset = event?.nativeEvent?.contentOffset?.y;

    setIsNearEnd(offset + layoutHeight >= containerHeight - 500);
  };

  const handleScrollToTop = async () => {
    scrollToTop();
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollYGlobal?.value < previousScrollYTopButton.current &&
      scrollYGlobal.value > 180;

    const opacity = withTiming(
      isScrollingUp && (isRestaurantvisible || isNearEnd) ? 1 : 0,
      {duration: 300},
    );
    const translateY = withTiming(
      isScrollingUp && (isRestaurantvisible || isNearEnd) ? 0 : 10,
      {duration: 300},
    );
    previousScrollYTopButton.current = scrollYGlobal.value;
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const viewabilityConfig = {
    viewAreaCoverPercentageThreshold: 80,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    const restaurantVisible = viewableItems.some(
      item => item?.section?.title === 'Restaurants' && item?.isViewable,
    );
    setisRestaurantvisible(restaurantVisible);
  };

  return (
    <SafeAreaView>
      <Animated.View>
        <BackToTopButton onPress={handleScrollToTop}/>
      </Animated.View>
      <SectionList sections={sectionedData} />
    </SafeAreaView>
  );
};

export default MainList;
