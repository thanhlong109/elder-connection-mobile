import { FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '~/constants/images';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { useGetPostsQuery } from '~/services/postApi';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { GetPostRespone } from '~/types/post.type';
import ActionItem from '~/components/ActionItem';
import LoadingModel from '~/components/LoadingModel';
import ErrorModel from '~/components/ErrorModel';

const nav = [
  {
    title: 'Chờ làm',
    id: 1,
  },
  {
    title: 'Lịch sử',
    id: 2,
  },
];

const action = () => {
  const [selectedNav, setSelectedNav] = useState(1);
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const [pastPosts, setpastPosts] = useState<GetPostRespone[]>();
  const [futurePosts, setfuturePosts] = useState<GetPostRespone[]>();

  const splitListByDate = (list: GetPostRespone[]) => {
    const pastDates: GetPostRespone[] = [];
    const futureDates: GetPostRespone[] = [];
    const currentDate = new Date();
    list.forEach((item) => {
      if (new Date(item.jobSchedule.endDate) < currentDate) {
        pastDates.push(item);
      } else {
        futureDates.push(item);
      }
    });
    setpastPosts([...pastDates]);
    setfuturePosts([...futureDates]);
  };

  //----------------------------- start call api get post ---------------------------//

  const { data, error, isError, isLoading, isSuccess, refetch } = useGetPostsQuery({
    data: accountId,
    pageIndex: 0,
    pageSize: 30,
  });

  useEffect(() => {
    if (isSuccess && data) {
      splitListByDate(data.result.items);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log('error call get post list', error);
    }
  }, [isError]);

  //----------------------------- end call api get post ---------------------------//

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModel isloading={isLoading} />
      <ErrorModel isError={isError} onReload={() => refetch()} />
      <View flex className=" bg-white ">
        <View className="border-b-[1px] border-gray-C5 bg-white px-6 pb-6 pt-4">
          <Text className="font-pmedium text-2xl">Hoạt động</Text>
        </View>
        <FlatList
          data={selectedNav === nav[0].id ? futurePosts : pastPosts}
          style={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 150)
                .duration(1000)
                .springify()}>
              <ActionItem item={item} />
            </Animated.View>
          )}
          ListEmptyComponent={() => (
            <View flex center>
              <Image
                source={images.Icons.empty}
                className="mt-[100px] h-[100px] w-[100px]"
                resizeMode="contain"
                tintColor={'gray'}
              />
              <Text className="font-plight text-xl !text-black-100">
                Bạn chưa đăng kí dịch vụ nào!
              </Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View>
              <View row className="w-full  border-b-[1px] border-gray-C5 bg-white">
                {nav.map((n) => (
                  <Button
                    backgroundColor={selectedNav === n.id ? colors.primary : '#E0E0E0'}
                    key={n.id}
                    flex
                    className="!rounded-none"
                    center
                    onPress={() => setSelectedNav(n.id)}>
                    <Text
                      color={selectedNav === n.id ? 'white' : '#333'}
                      className="py-1 font-pregular text-lg">
                      {n.title}
                    </Text>
                  </Button>
                ))}
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default action;
