import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API from "../api/api";
import Star from "../assets/images/staricon - Copy.svg";
import Rate from "../components/rateevent card";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const RateEvents = () => {
  const router = useRouter();
  const { eventKey } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const feedbackOptions = [
    "Well organised",
    "Friendly team",
    "Impactful",
    "Good Communication",
  ];

  useEffect(() => {
    const getDetails = async () => {
      if (!eventKey) return;
      try {
        setLoading(true);
        const response = await API.get(`/events/${eventKey}`);
        setEvent(response.data.data || response.data);
      } catch (error) {
        console.error("Error occured", error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [eventKey]);

  const toggleFeedback = (option) => {
    if (selectedFeedback.includes(option)) {
      setSelectedFeedback(selectedFeedback.filter((item) => item !== option));
    } else {
      setSelectedFeedback([...selectedFeedback, option]);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Hold up!", "Please select a star rating before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        eventId: eventKey,
        rating: Number(rating),
        tags: selectedFeedback.length ? selectedFeedback : null,
        comment: review || "",
        organizerId: event.organizationId?._id,
      };

      const response = await API.post("/ratings", payload);

      console.log("Rating Success:", response.data);

      Alert.alert("Success!", "Thank you for your feedback!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      // console.error("Error submitting rating:", error);
      Alert.alert(
        "Oops!",
        error.response?.data?.message ||
          "Something went wrong while submitting your review.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenInfo ScreenTitle={"Rate Events"} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={styles.loader}
            />
          ) : event ? (
            <Rate
              title={event.name || "Untitled Event"}
              image={
                event.image && event.image.startsWith("http")
                  ? { uri: event.image }
                  : require("../assets/images/eventimage-1.png")
              }
              verification={
                event.organizationId?.verificationStatus === "approved"
                  ? "Verified"
                  : "Unverified"
              }
              hostedBy={event.organizationId?.fullName || "Unknown Host"}
            />
          ) : (
            <Text style={styles.notFoundText}>Event not found.</Text>
          )}
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((starNumber) => (
              <TouchableOpacity
                key={starNumber}
                activeOpacity={0.7}
                onPress={() => setRating(starNumber)}
              >
                <Star
                  width={32}
                  height={32}
                  color={
                    starNumber <= rating ? COLORS.highlight : COLORS.neutral
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>
            Tell us more about your experience
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Share your experience to help other volunteers"
            placeholderTextColor={COLORS.neutral}
            multiline={true}
            value={review}
            onChangeText={setReview}
          />
        </View>

        <View style={styles.checklistContainer}>
          {feedbackOptions.map((option, index) => {
            const isSelected = selectedFeedback.includes(option);
            return (
              <TouchableOpacity
                key={index}
                style={styles.checklistItem}
                onPress={() => toggleFeedback(option)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkboxBase,
                    isSelected
                      ? styles.checkboxSelected
                      : styles.checkboxUnselected,
                  ]}
                >
                  {isSelected && <Text style={styles.checkmarkText}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={isSubmitting} // <--- Prevents double clicks!
        >
          {isSubmitting ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Review</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: 20,
  },
  loader: {
    marginTop: 50,
  },
  notFoundText: {
    textAlign: "center",
    marginTop: 50,
  },
  ratingSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  inputLabel: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    borderColor: COLORS.neutral,
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 82,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  checklistContainer: {
    marginBottom: 25,
    alignSelf: "flex-start",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  checkboxSelected: {
    borderWidth: 0,
    backgroundColor: COLORS.primary,
  },
  checkboxUnselected: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
  },
  checkmarkText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -2,
  },
  checkboxLabel: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#000",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderRadius: 28,
    marginVertical: 18,
    marginBottom: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.semibold,
    fontSize: 24,
  },
});

export default RateEvents;
