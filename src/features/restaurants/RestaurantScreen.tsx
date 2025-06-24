import {View, Text, Platform, FlatList} from 'react-native';
import React, {FC} from 'react';
import {useRoute} from '@react-navigation/native';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '@unistyles/restuarantStyles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomText from '@components/global/CustomText';
import SortingAndFilters from '@components/home/SortingAndFilters';
import {restaurantItemsData, restaurantsItemfiltersOption} from '@utils/dummyData';
import RestaurantHeader from '@components/restaurant/RestaurantHeader';
import DottedLine from '@components/ui/DottedLine';
import FoodCard from '@components/restaurant/FoodCard';

const RestaurantScreen: FC = () => {
  const route = useRoute() as any;
  const restaurant = route?.params?.item;
  const {styles} = useStyles(restaurantHeaderStyles);

  const renderItem = ({item}:any) =>{
    return(
      <FoodCard item={item} restaurant={restaurant}/>
    )
  }

  return (
    <SafeAreaView>
      <RestaurantHeader title={restaurant?.name}/>
      <View style={styles.sortingContainer}>
        <SortingAndFilters
          menuTitle="Filter"
          options={restaurantsItemfiltersOption}
        />
      </View>

      <FlatList
       data={restaurantItemsData}
       renderItem={renderItem}
       scrollEventThrottle={16}
       keyExtractor={item =>item.id}
       ItemSeparatorComponent={()=>(
        <View style={styles.mainPadding}>
         <DottedLine/>
        </View>
       )}

       contentContainerStyle={styles.scrollContainer}
      />
    </SafeAreaView>
  );
};

export default RestaurantScreen;
