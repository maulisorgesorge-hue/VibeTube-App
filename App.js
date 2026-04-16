mport React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header - App Logo and Search */}
      <View style={styles.header}>
        <Text style={styles.logo}>VibeTube</Text>
        <Ionicons name="search" size={26} color="black" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories Section (Instagram Style) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storySection}>
          <View style={styles.myStory}><Text style={styles.plus}>+</Text></View>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.storyCircle} />
          ))}
        </ScrollView>

        {/* 20-30 Min Videos Section (YouTube Style) */}
        <Text style={styles.sectionTitle}>Recommended Videos (20-30 min)</Text>
        
        {[1, 2].map((video) => (
          <View key={video} style={styles.ytCard}>
            <View style={styles.thumbnail}>
              <Ionicons name="play-circle" size={50} color="white" />
              <View style={styles.duration}><Text style={{color:'white', fontSize:12}}>25:10</Text></View>
            </View>
            <View style={styles.videoInfo}>
              <View style={styles.userIcon} />
              <View>
                <Text style={styles.videoTitle}>How to build the next big Social App #VibeTube</Text>
                <Text style={styles.videoStats}>SuperTeam • 1.2M views • 2 days ago</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Page (As per your drawing) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="home" size={28} color="black" /><Text style={styles.navText}>Home</Text></TouchableOpacity>
        <TouchableOpacity><Ionicons name="play-box" size={28} color="gray" /><Text style={styles.navText}>Videos</Text></TouchableOpacity>
        <TouchableOpacity><Ionicons name="add-circle" size={35} color="red" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="send" size={28} color="gray" /><Text style={styles.navText}>Sending</Text></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person" size={28} color="gray" /><Text style={styles.navText}>Profile</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 45 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', marginBottom: 10 },
  logo: { fontSize: 26, fontWeight: 'bold', color: '#FF0000', letterSpacing: -1 },
  storySection: { paddingLeft: 10, marginBottom: 15, borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingBottom: 10 },
  myStory: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  plus: { fontSize: 20, fontWeight: 'bold', color: '#555' },
  storyCircle: { width: 65, height: 65, borderRadius: 32.5, borderWidth: 2, borderColor: '#FF0000', marginRight: 10, backgroundColor: '#f0f0f0' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 },
  ytCard: { marginBottom: 20 },
  thumbnail: { width: width, height: 220, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  duration: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.8)', padding: 3, borderRadius: 4 },
  videoInfo: { flexDirection: 'row', padding: 12 },
  userIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc', marginRight: 12 },
  videoTitle: { fontSize: 15, fontWeight: '600', width: width - 80 },
  videoStats: { fontSize: 13, color: 'gray', marginTop: 4 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 8, borderTopWidth: 0.5, borderTopColor: '#ccc', backgroundColor: '#fff' },
  navText: { fontSize: 10, textAlign: 'center' }
});
    
