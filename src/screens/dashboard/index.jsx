import React, { useState } from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AuthLayout from '../../layouts/auth';
import { color, sizes } from '../../config/theme';
import { ActivityIndicator, TextInput } from 'react-native';
import { engineSearching } from '../../hooks/auth-hook';
import { useToast } from 'react-native-toast-notifications';

const MainScreen = () => {
    const [searchText, setSearch] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [engineData, setEngineData] = useState(null);

    const toast = useToast();

    const handleEngineSearch = async () => {
        if (searchText.length > 6) {
            setLoading(true);
            setEngineData(null);
            try {
                const lowVal = searchText.toString().toLowerCase();
                const response = await engineSearching(lowVal);

                if (response.status == 200 && response.data.length > 0) {
                    setEngineData(response.data[0]);
                } else if (
                    response.status == 403 &&
                    response.data.code == 'search_limit_exceeded'
                ) {
                    toast.show(response.data.message, {
                        type: 'custom',
                    });
                } else {
                    toast.show('No engine registered with this serial number ', {
                        type: 'custom',
                    });
                }
                setSearch('');
                setLoading(false);
            } catch (err) {
                console.log('Error', err);
                setLoading(false);
            }
        } else {
            toast.show('Invalid Engine Number', {
                type: 'custom',
            });
        }
    };

    return (
        <AuthLayout noBackBtn alignTop logOutBtn>
            <PageHeading>Validate an engine</PageHeading>

            <PageCard
                style={{
                    shadowColor: color.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <PageCardText>Enter a YD engine serial number to validate it's status</PageCardText>

                <PageCardSearch
                    placeholder="eg: Y230802044"
                    value={searchText}
                    onChangeText={(val) => setSearch(val)}
                />
                <PageCardButton onPress={handleEngineSearch} disabled={searchText.length == 0}>
                    <PageCardBtnText>
                        {isLoading ? (
                            <ActivityIndicator color={color.white} size={sizes.size20} />
                        ) : (
                            'Validate'
                        )}
                    </PageCardBtnText>
                </PageCardButton>
            </PageCard>

            {engineData && (
                <SerialCard
                    style={{
                        shadowColor: color.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <SerialCardImageWrap>
                        <SerialCardImage source={require('../../assets/images/engine-img.png')} />
                    </SerialCardImageWrap>

                    <SerialCardInfoWrap>
                        <SerialLabel>Serial Number:</SerialLabel>
                        <SerialValue>{engineData?.acf_fields?.serial_number}</SerialValue>
                    </SerialCardInfoWrap>
                    <SerialCardInfoWrap>
                        <SerialLabel>Model:</SerialLabel>
                        <SerialValue>{engineData?.acf_fields?.model}</SerialValue>
                    </SerialCardInfoWrap>
                    <SerialCardInfoWrap>
                        <SerialLabel>Order Number:</SerialLabel>
                        <SerialValue>{engineData?.acf_fields?.build_list}</SerialValue>
                    </SerialCardInfoWrap>
                    <SerialCardInfoWrap>
                        <SerialLabel>Build Year:</SerialLabel>
                        <SerialValue>{engineData?.acf_fields?.build_year}</SerialValue>
                    </SerialCardInfoWrap>
                    <SerialCardInfoWrap>
                        <SerialLabel>Build Location:</SerialLabel>
                        <SerialValue>{engineData?.acf_fields?.build_location}</SerialValue>
                    </SerialCardInfoWrap>
                </SerialCard>
            )}
        </AuthLayout>
    );
};

const PageHeading = styled.Text`
    font-size: ${sizes.size22}px;
    font-weight: 500;
    color: ${color.black};
    margin-bottom: ${wp('6%')}px;
`;

const PageCard = styled.View`
    background-color: ${color.white};
    padding: ${wp('4%')}px;
    margin-bottom: ${wp('6%')}px;
`;

const PageCardText = styled.Text`
    font-size: ${sizes.size20}px;
    color: ${color.primary};
`;

const PageCardButton = styled.TouchableOpacity`
    background-color: ${color.primary};
    padding: ${wp('2.5%')}px ${wp('8%')}px;
    width: ${wp('32%')}px;
`;

const PageCardBtnText = styled.Text`
    color: ${color.white};
    font-size: ${sizes.size18}px;
    text-align: center;
    font-weight: 500;
`;

const PageCardSearch = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: ${color.black}40;
    margin-top: ${wp('3%')}px;
    margin-bottom: ${wp('5%')}px;
    color: ${color.black};
`;

const SerialCard = styled.View`
    background-color: ${color.white};
    margin-bottom: ${wp('6%')}px;
`;

const SerialCardImageWrap = styled.View`
    padding: ${wp('6%')}px;
`;

const SerialCardImage = styled.Image`
    margin-left: auto;
    margin-right: auto;
    width: ${wp('60%')}px;
    height: ${wp('32%')}px;
    resize-mode: contain;
`;

const SerialCardInfoWrap = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${wp('3%')}px;
    border-top-width: 1px;
    border-top-color: ${color.black}40;
`;

const SerialLabel = styled.Text`
    color: ${color.black}99;
    font-size: ${sizes.size18}px;
`;

const SerialValue = styled.Text`
    color: ${color.primary};
    font-size: ${sizes.size16}px;
`;

export default MainScreen;
