import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, 
  Alert, FlatList, ActivityIndicator, Dimensions 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase-config"; 

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [userStory, setUserStory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleReport = (postId) => {
    Alert.alert("Report Post", "क्या आप इस पोस्ट को रिपोर्ट करना चाहते हैं?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Report", 
        onPress: async () => {
          try {
            await addDoc(collection(db, "reports"), {
              postId,
              reportedBy: auth.currentUser?.uid || "anonymous",
              timestamp: serverTimestamp()
            });
            Alert.alert("Success", "रिपोर्ट दर्ज कर ली गई है।");
          } catch (error) {
            Alert.alert("Error", "समस्या आई।");
          }
        } 
      }
    ]);
  };

  // पोस्ट रेंडर करने का अलग फंक्शन (Clean Code)
  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userPlaceholder} />
          <Text style={styles.postUser}>{item.username || "User"}</Text>
        </View>
        <TouchableOpacity onPress={() => handleReport(item.id)}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#262626" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.imageUrl }} style={styles.postImage} resizeMode="cover" />

      <View style={styles.postFooter}>
        <View style={styles.footerLeft}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={24} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="paper-plane-outline" size={24} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
        <Ionicons name="bookmark-outline" size={24} color="black" />
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={{ fontWeight: 'bold' }}>{item.username || "User"} </Text>
          {item.caption}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>SocialStream</Text>
        <Ionicons name="heart-outline" size={26} color="black" />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.storySection}>
            <TouchableOpacity style={styles.storyCircle}>
              <View style={styles.addIcon}>
                <Ionicons name="add" size={20} color="white" />
              </View>
              <Text style={styles.storyLabel}>Your Story</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 10 },
  header: { fontSize: 24, fontWeight: "bold", color: "#000" },
  storySection: { paddingVertical: 10, paddingLeft: 15, borderBottomWidth: 0.3, borderBottomColor: '#dbdbdb' },
  storyCircle: { alignItems: "center", marginRight: 15 },
  addIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#E91E63", justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#fff" },
  storyLabel: { marginTop: 4, fontSize: 11 },
  postCard: { marginBottom: 15 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  userPlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#efefef', marginRight: 10 },
  postUser: { fontWeight: '600', fontSize: 14 },
  postImage: { width: width, height: width },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 10 },
  footerLeft: { flexDirection: 'row', alignItems: 'center' },
  captionContainer: { paddingHorizontal: 12, paddingTop: 5 },
  caption: { fontSize: 14, color: '#262626', lineHeight: 18 }
});
    
