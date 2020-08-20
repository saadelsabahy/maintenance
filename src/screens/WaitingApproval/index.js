import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  ImageCarousel,
  Header,
  Icon,
  ComplainsItem,
  CustomBottomSheet,
  CustomButton,
  CustomText,
  ImagePickerModal,
} from '../../components';
import {
  WHITE_COLOR,
  MAIN_COLOR,
  SECONDART_COLOR,
  DASHBOARD_ITEM_ICON_CONTAINER,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  HEADER_ICONS_COLOR,
  SURFACE_COLOR,
  BOTTOMSHEET_COLOR,
} from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  onExcutionDone,
  onAcceptThePreview,
  onRejectThePreview,
  selectExcutionPhotos,
  onCloseExcutionSheet,
  onSaveSignature,
  deleteImagePath,
} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import BackgroundImage from '../../assets/images/app_bg.png';
import {
  WAIT_EXCUTION,
  LATE_EXCUTION,
  SOLVED,
  REJECTED,
  EVISION_USER,
  AMANA_USER,
} from '../../utils/complainsStutus';
import {showFlashMessage} from '../../utils/flashMessage';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const WaitApproval = ({navigation, route}) => {
  const {data, distination} = route.params;
  const [userType, setuserType] = useState(null);
  const [showSignatureError, setshowSignatureError] = useState(false);
  const [isSignatureModalVisible, setisSignatureModalVisible] = useState(false);
  const [galleryModalVisible, setgalleryModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    images,
    acceptSpinner,
    rejectSpinner,
    excutionSpinner,
    signature,
  } = useSelector(state => ({
    images: state.UpdateComplainsStatus.images,
    acceptSpinner: state.UpdateComplainsStatus.acceptSpinner,
    rejectSpinner: state.UpdateComplainsStatus.rejectSpinner,
    excutionSpinner: state.UpdateComplainsStatus.excutionSpinner,
    signature: state.UpdateComplainsStatus.signature,
  }));
  useEffect(() => {
    getUserType();
    return () => {
      dispatch(deleteImagePath());
    };
  }, []);
  const getUserType = async () => {
    const userType = await AsyncStorage.getItem('userType');
    setuserType(userType);
  };
  const handleSignatureModal = () => {
    setisSignatureModalVisible(!isSignatureModalVisible);
  };
  const renderButtons = () => {
    switch (distination) {
      case WAIT_EXCUTION:
      case LATE_EXCUTION:
        return (
          userType == EVISION_USER && (
            <CustomButton
              buttonContainerStyle={{...styles.button, width: '90%'}}
              buttonTitle={'تم الحل'}
              onButtonPressed={() => dispatch(onExcutionDone(data, navigation))}
              loading={excutionSpinner}
              spinnerColor={WHITE_COLOR}
            />
          )
        );
        break;
      case SOLVED:
        return null;
        break;
      case REJECTED:
        if (userType != AMANA_USER && userType != EVISION_USER)
          return (
            <CustomButton
              buttonContainerStyle={{...styles.button, width: '90%'}}
              buttonTitle={'تعميد'}
              onButtonPressed={() =>
                dispatch(onAcceptThePreview(data, navigation))
              }
              loading={acceptSpinner}
            />
          );
        return null;
        break;
      default:
        if (userType != AMANA_USER && userType != EVISION_USER)
          return (
            <View
              style={{
                ...styles.buttonsContainer,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomButton
                buttonContainerStyle={styles.button}
                buttonTitle={'تعميد'}
                onButtonPressed={() => {
                  if (!signature) {
                    handleSignatureModal();
                    setshowSignatureError(!showSignatureError);
                  } else {
                    setshowSignatureError(false);
                    dispatch(onAcceptThePreview(data, navigation));
                  }
                }}
                loading={acceptSpinner}
                spinnerColor={WHITE_COLOR}
              />
              <CustomButton
                buttonContainerStyle={styles.button}
                buttonTitle={'رفض'}
                onButtonPressed={() =>
                  dispatch(onRejectThePreview(data, navigation))
                }
                loading={rejectSpinner}
                spinnerColor={WHITE_COLOR}
              />
            </View>
          );
        return null;
        break;
    }
  };
  const toggleGalleryModal = () => {
    setgalleryModalVisible(!galleryModalVisible);
  };
  const handleSelectImage = async type => {
    await toggleGalleryModal();
    dispatch(selectExcutionPhotos(type));
  };
  return (
    <ImageBackground
      source={BackgroundImage}
      style={styles.container}
      resizeMode="stretch">
      <Header containerStyle={{width: '90%'}}>
        <Icon
          name={'arrow-right'}
          type={'simple-line-icon'}
          color={HEADER_ICONS_COLOR}
          onPress={() => navigation.goBack()}
          iconContainerStyle={{flex: 0.1}}
          size={responsiveFontSize(3)}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText text={data.complainNumber} />
        </View>
        {/* <View style={styles.headerIconContainer}>
               <Icon
                  name={'list-unordered'}
                  type={'octicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View> */}
      </Header>

      {!userType ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            color={WHITE_COLOR}
            size={'large'}
            style={{alignSelf: 'center'}}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              width: '100%',
              height: '35%',
            }}>
            <ImageCarousel data={data.images ? data.images : []} />
          </View>
          <View style={styles.detailesContainer}>
            <ComplainsItem
              containerStyle={styles.complainsItemContainer}
              {...data}
              onComplainPressed={() => {}}
            />
          </View>
          <View style={styles.bottomSheetContainer}>
            <CustomBottomSheet
              source={distination}
              excutionImages={images}
              onSelectExcutionImages={toggleGalleryModal}
              spareParts={data.spareParts ? data.spareParts : []}
              oncloseBottomSheet={() => dispatch(onCloseExcutionSheet())}
              userType={userType}
              vehicleNumber={data.vehicleNumber}
              contractorNumber={data.contractorNumber}
              handleSignatureModal={handleSignatureModal}
              isSignatureModalVisible={isSignatureModalVisible}
              handleSaveSignature={signature =>
                dispatch(onSaveSignature(signature))
              }
              signature={signature}
              showSignatureError={showSignatureError}
            />
          </View>
          <View style={styles.buttonsContainer}>{renderButtons()}</View>
          <ImagePickerModal
            toggleModal={toggleGalleryModal}
            isModalVisible={galleryModalVisible}
            onOpenCamerapressed={() => handleSelectImage('camera')}
            onOpenGallerypressed={() => handleSelectImage('gallery')}
          />
        </>
      )}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SURFACE_COLOR,
  },
  headerIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 10,
  },
  detailesContainer: {
    flex: 1,
  },
  complainsItemContainer: {
    flex: 1,
    height: '100%',
    borderRadius: 0,
    borderTopStartRadius: 50,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  bottomSheetContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '100%',
    alignSelf: 'center',
    zIndex: 1000,
    backgroundColor: BOTTOMSHEET_COLOR,
  },
  button: {
    width: '40%',
    height: SCREEN_HEIGHT / 18,
  },
});

export default WaitApproval;
