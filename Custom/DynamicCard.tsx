import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from './Theme';
import { router } from 'expo-router';

const DynamicCard = ({ data }) => {
  const theme = useTheme();

  const handleButtonAction = (action) => {
    if (action === 'navigate') {
      router.push({
        pathname: '/ComponentOverviewScreen',
        params: {
          deviceId: data.id
        }
      });
    }
  };

  const renderSection = (section) => {
    return section.map((item, index: React.Key | null | undefined) => {
      if (item.type === 'text') {
        return (
          <Text key={index} style={[styles.text, { color: theme.text }]}>
            {item.label}: {data.data[item.dataType] || 'N/A'}
          </Text>
        );
      } else if (item.type === 'icon') {
        return (
          <MaterialCommunityIcons
            key={index}
            name={item.name}
            size={24}
            color={theme.whisperGreen}
            style={styles.icon}
          />
        );
      }
      return null;
    });
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.header, { backgroundColor: theme.whisperGreen }]}>
        <Text style={[styles.title, { color: theme.whiteText }]}>{data.name}</Text>
      </View>

      <View style={[styles.status, { backgroundColor: theme.whisperGreen }]}>
        <Text style={[styles.buttonText, { color: theme.whiteText }]}>{renderSection(data.overviewConfig.layout.left)}</Text>
      </View>

      <View style={styles.layout}>
        <View style={styles.leftSection}>{renderSection(data.overviewConfig.layout.left)}</View>
        <View style={styles.centerSection}>{renderSection(data.overviewConfig.layout.center)}</View>
        <View style={styles.rightSection}>{renderSection(data.overviewConfig.layout.right)}</View>
      </View>

      <View style={styles.buttonContainer}>
        {data.overviewConfig.buttons.map((button: { action: any; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: theme.whisperGreen }]}
            onPress={() => handleButtonAction(button.action)}
          >
            <Text style={[styles.buttonText, { color: theme.whiteText }]}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  header: {
    width: "100%",
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  status: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: "100%"
  },
  leftSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  icon: {
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default DynamicCard;
