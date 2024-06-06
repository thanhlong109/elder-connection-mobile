import { FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import CustomButton from '~/components/CustomButton';
import AddressItem from '~/components/AddressItem';
import { useGetAddressQuery } from '~/services/addressApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import LoadingModel from '~/components/LoadingModel';
import { Text, View } from 'react-native-ui-lib';
import { setCreateNewAddress } from '~/slices/addressSlice';

const selectAddress = () => {
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const dispatch = useDispatch();
  const [query, setquery] = useState<PaggingRequest<String>>({
    data: accountId,
    pageIndex: 1,
    pageSize: 20,
  });

  //--------------------------- start call api ----------------------------//

  const { isError, isLoading, error, data } = useGetAddressQuery(query);

  useEffect(() => {
    if (isError) {
      console.log('error get address list: ', error);
    }
  }, [isError]);

  //--------------------------- end call api ----------------------------//

  return (
    <View flex>
      <LoadingModel isloading={isLoading} />
      <View flex className=" justify-between gap-4 bg-white px-6 pb-5">
        <View flex>
          <Text className="mb-8 mt-6 font-psemibold text-lg">Danh sách địa điểm</Text>
          {data && (
            <FlatList
              showsVerticalScrollIndicator={false}
              className="flex"
              data={data.result.items}
              renderItem={({ item, index }) => (
                <View key={index} className="my-1 p-2">
                  <AddressItem address={item} />
                </View>
              )}
            />
          )}
        </View>
        <CustomButton
          handlePress={() => dispatch(setCreateNewAddress())}
          title="Thêm địa chỉ mới"
        />
      </View>
    </View>
  );
};

export default selectAddress;
