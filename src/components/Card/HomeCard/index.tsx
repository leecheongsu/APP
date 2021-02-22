// Example of Collapsible/Accordion/Expandable List View in React Native
// https://aboutreact.com/collapsible-accordion-expandable-view/

// import React in our code
import { insuImg } from '@app/assets';
import { Typhograph } from '@app/components';
import { useInterval } from '@app/hooks';
import theme from '@app/style/theme';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

function HomeCard() {
  const [activeSections, setActiveSections] = useState([0]);
  const navigation = useNavigation();

  const CONTENT = [
    {
      title: '주택화재',
      content: insuImg.MAIN1,
      onClick: () => navigation.navigate('HOUSE_FIRE'),
    },
    {
      title: '풍수해 Ⅵ',
      content: insuImg.MAIN3,
      onClick: () => navigation.navigate('STORM_FLOOD'),
    },
    {
      title: '배상책임(다중이용시설)',
      content: insuImg.MAIN2,
      onClick: () => navigation.navigate('STORM_FLOOD2'),
    },
    {
      title: '배상책임(재난)',
      content: insuImg.MAIN4,
      onClick: () => navigation.navigate('CALAMITY'),
    },
  ];

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, index, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={200}
        style={[
          styles.header,
          isActive ? styles.active : styles.inactive,
          index === 0 && styles.topRadius,
          index === 0 ? { padding: 25 } : isActive ? { padding: 0 } : { padding: 25 },
          index === 3 && styles.bottomRadius,
          index === 3 && { borderBottomWidth: 0 },
          ,
        ]}
        transition="backgroundColor">
        {isActive ? null : (
          <Typhograph type="NOTO" color="BLUE" style={{ textAlign: 'center', fontSize: 20 }}>
            {section.title}
          </Typhograph>
        )}
      </Animatable.View>
    );
  };

  const renderContent = (section, index, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={200}
        style={[
          styles.content,
          isActive ? styles.active : styles.inactive,
          index === 0 && { marginTop: -20 },
          index === 3 && styles.bottomRadius,
        ]}
        transition="backgroundColor">
        {isActive ? (
          <TouchableOpacity onPress={() => section.onClick()}>
            <Animatable.Image easing="ease-in" source={section.content} style={{ width: 300, height: 260 }} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 300, height: 260, backgroundColor: 'white' }} />
        )}
      </Animatable.View>
    );
  };

  useInterval(() => {
    if (activeSections[0] === 0) {
      return setSections([1]);
    } else if (activeSections[0] === 1) {
      return setSections([2]);
    } else if (activeSections[0] === 2) {
      return setSections([3]);
    } else if (activeSections[0] === 3) {
      return setSections([0]);
    }
  }, 3000);

  return (
    <View style={styles.container}>
      <Accordion
        activeSections={activeSections}
        sections={CONTENT}
        renderHeader={renderHeader}
        renderContent={renderContent}
        duration={400}
        onChange={setSections}
      />
    </View>
  );
}

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  topRadius: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  bottomRadius: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: theme.color.GRAY2,
    borderBottomWidth: 0.9,
    borderBottomColor: theme.color.BORDER_GRAY,
  },
});
