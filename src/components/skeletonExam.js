import { TimeRemainingSkeleton, QuestionIndexSkeleton, QuestionSkeleton, ButtonsContainerSkeleton } from './skeleton';
import { View, StyleSheet, SafeAreaView } from 'react-native';

export const SkeletonExam = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <TimeRemainingSkeleton />
        <QuestionIndexSkeleton />
        <QuestionSkeleton />
        <QuestionSkeleton />
        <QuestionSkeleton />
        <QuestionSkeleton />

        <ButtonsContainerSkeleton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
