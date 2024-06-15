import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib';
import WebView, { WebViewNavigation } from 'react-native-webview';
import CustomDialog from '~/components/CustomDialog';
import LoadingModel from '~/components/LoadingModel';
import { DialogType } from '~/enums';

const paymentWebview = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentStatus, setPaymentStatus] = useState<DialogType>(DialogType.INFO);
  const { urlRequest } = useLocalSearchParams();
  const [showDialog, setshowDialog] = useState(false);
  const [link, setlink] = useState('');

  useEffect(() => {
    if (urlRequest) {
      setlink(urlRequest as string);
    }
  }, [urlRequest]);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;

    // Kiểm tra nếu URL chứa 'vnp_ResponseCode' và 'vnp_TransactionStatus'
    if (url.includes('vnp_ResponseCode') && url.includes('vnp_TransactionStatus')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const responseCode = params.get('vnp_ResponseCode');
      const transactionStatus = params.get('vnp_TransactionStatus');

      if (responseCode === '00' && transactionStatus === '00') {
        setPaymentStatus(DialogType.SUCCESS);
      } else {
        setPaymentStatus(DialogType.ERROR);
      }
      setshowDialog(true);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex>
        <LoadingModel isloading={loading} />
        <CustomDialog
          visble={showDialog}
          setVisible={setshowDialog}
          body="Thanh toán thành công!"
          type={paymentStatus}
          onDismiss={() => {
            router.replace('home');
          }}
        />
        <WebView
          source={{ uri: link }}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default paymentWebview;
