import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {db} from '../Firebase/firebaseconfig';
import colors from '../assets/colors';

const Comments = () => {
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    db.ref('/comments').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let comments = [...Object.values(data)];
      setCommentsList(comments);
    });
  }, []);

  const addComments = () => {
    db.ref('/comments')
      .push({
        userName: 'Tanu Priya',
        payload: commentText,
      })
      .then(res => {
        // Alert.alert('Action!', 'Comment has been added');
      })
      .catch(err => {
        console.log('errr=====', err);
      });
    setCommentText('');
  };

  const clearComments = () => {
    db.ref('/comments').remove();
  };

  const getComment = () => {
    return (
      <View style={styles.commentsWrapper}>
        <View style={styles.comment}>
          <Image
            style={styles.avatarStyle}
            width={40}
            height={40}
            source={require('../assets/images/avatar.jpg')}
          />
          <View style={styles.commentBox}>
            <Text style={styles.commentor}>Tanu Priya</Text>
            <Text style={styles.text}> What a fantastic Picture</Text>
            <Text style={styles.replyText}>Reply</Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={18}
          color={colors.lightBlack}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* header Section */}
      <SafeAreaView style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Add comments</Text>
      </SafeAreaView>

      {/* List all comments  */}
      <View style={styles.commentsListWrapper}>
        {commentsList &&
          commentsList.length > 0 &&
          commentsList.map(comment => (
            <View style={styles.commentsWrapper}>
              <View style={styles.comment}>
                <Image
                  style={styles.avatarStyle}
                  width={40}
                  height={40}
                  source={require('../assets/images/avatar.jpg')}
                />
                <View style={styles.commentBox}>
                  <Text style={styles.commentor}>{comment.userName}</Text>
                  <Text style={styles.text}>{comment.payload}</Text>
                  <Text style={styles.replyText}>Reply</Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={18}
                color={colors.lightBlack}
              />
            </View>
          ))}
      </View>

      {/* Add comments input  */}
      <View style={styles.formControlWrapper}>
        <TextInput
          style={styles.formControlInput}
          onChangeText={text => setCommentText(text)}
          value={commentText}
          placeholder="Write you comment..."
        />
        <View style={styles.iconWrapper}>
          <Ionicons
            style={styles.sendIconStyle}
            name="send"
            color={colors.white}
            size={35}
            onPress={() => {
              addComments();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    // flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },

  commentsListWrapper: {
    flex: 5,
  },
  formControlWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  formControlInput: {
    borderColor: colors.lightBlack,
    borderWidth: 1,
    borderRadius: 25,
    width: '85%',
    fontSize: 18,
    padding: 10,
  },
  iconWrapper: {
    backgroundColor: colors.purple,
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarStyle: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  commentsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  comment: {
    flexDirection: 'row',
  },
  commentBox: {
    paddingLeft: 5,
  },

  commentor: {
    fontWeight: 'bold',
  },
  text: {},
  replyText: {
    fontWeight: '700',
    paddingLeft: 5,
    marginTop: 5,
  },
});

export default Comments;
