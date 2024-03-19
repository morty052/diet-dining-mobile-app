import {
  View,
  Text,
  FlatList,
  ViewToken,
  Modal,
  StyleSheet,
  Image,
  Pressable,
  SectionList,
  ScrollView,
  Platform,
} from "react-native";
import DietPlanCard, {
  IngredientTag,
} from "../../../components/cards/DietPlanCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { REGULAR, SEMI_BOLD, THIN } from "../../../constants/fontNames";
import { seafoods_emoji } from "../../../assets/foodcategories";
import Colors from "../../../constants/colors";
import React from "react";
import {
  keto_bg,
  meditteranean_bg,
  paleo_bg,
  plant_based_bg,
  wholefoods_bg,
} from "../../../assets/diet-plan-images";
import Animated from "react-native-reanimated";
import HorizontalRule from "../../../components/ui/HorizontalRule";

const dietPlans = [
  {
    image: meditteranean_bg,
    name: "Mediterranean Diet",
    title: "Mediterranean",
    description:
      "Focuses on fruits, vegetables, whole grains, fish, nuts, and olive oil",
    tags: ["Vegetables", "Whole grains", "Fish", "Nuts", "Olive oil"],
    benefits: [
      {
        title: "Reduced Risk of Heart Disease",
        data: [
          "Multiple studies suggest that the Mediterranean diet is beneficial for heart health. As it helps lower the risk of cardiovascular diseases, including heart attacks and strokes",
        ],
      },
      {
        title: "Improved Brain and Gut Health",
        data: [
          "Emphasizes on whole, minimally-processed foods, including plenty of fruits, vegetables, and healthy fats. These components contribute to better brain function and gut health",
        ],
      },
      {
        title: "Healthier Weight Management",
        data: [
          "Encourages portion control and emphasizes nutrient-dense foods. the mediterranean diet can aid in weight loss and maintenance",
        ],
      },
    ],
  },
  {
    image: keto_bg,
    name: "Keto Diet",
    title: "Keto",
    description:
      "Emphasizes high-fat, low-carb foods like meat, fish, eggs, cheese, nuts and healthy oils",
    tags: ["Vegetables", "Whole grains", "Fish", "Nuts", "Olive oil"],
    benefits: [
      {
        title: "Weight Loss",
        data: [
          "The keto diet is particularly effective for weight loss. By significantly reducing carbohydrate intake and increasing fat consumption, the body enters a state called ketosis. In ketosis, the body burns stored fat for energy, leading to rapid weight loss, especially during the initial weeks",
        ],
      },
      {
        title: "Appetite Suppression",
        data: [
          "A low-carb, high-fat diet tends to reduce hunger and appetite. When you’re in ketosis, your body relies on fat stores, which helps control food cravings and overeating",
        ],
      },
      {
        title: "Improved Blood Sugar Control",
        data: [
          "The keto diet can benefit individuals with type 2 diabetes or insulin resistance. By minimizing carb intake, blood sugar levels stabilize, reducing the need for insulin",
        ],
      },
    ],
  },
  {
    image: plant_based_bg,
    name: "Plant Based Diet",
    title: "Plant Based",
    description:
      "Centered around foods derived from plants, including fruits, vegetables, grains, nuts, and seeds.",
    tags: ["Vegetables", "Whole grains", "Fish", "Nuts", "Olive oil"],
    benefits: [
      {
        title: "Immune System Support",
        data: [
          "Plant-based foods provide essential nutrients that are crucial for a healthy immune system. Vitamins, minerals, phytochemicals, and antioxidants found in plants help maintain cell health and balance, allowing your immune system to function optimally.",
        ],
      },
      {
        title: "Heart Health",
        data: [
          "Plant-based diets are associated with lower blood pressure and reduced risk of heart disease. By consuming whole grains, fruits, vegetables, and nuts, plant based diet supports cardiovascular health",
        ],
      },
      {
        title: "Type 2 Diabetes Prevention",
        data: [
          "Plant based foods are rich in fiber, which stabilizes blood sugar levels and improves insulin sensitivity2.",
        ],
      },
    ],
  },
  {
    image: paleo_bg,
    name: "Paleo Diet",
    title: "Paleo",
    description:
      "Based on foods presumed to have been available to patheolithic humans, such as lean meats, fish, fruits, vegetables, nuts, and seeds",
    tags: ["lean meats", "Fruits", "Vegetables", "Seeds", "Fish"],
    benefits: [
      {
        title: "Balances Blood Glucose Levels",
        data: [
          "By avoiding refined sugar, the Paleo diet helps prevent spikes in blood glucose levels and reduces fatigue caused by sugar crashes. If you’re diabetic, consult your doctor to see if this diet plan is suitable for you",
        ],
      },
      {
        title: "Leaner Muscles",
        data: [
          "emphasizes meat consumption, providing ample protein to support lean muscle development. A lean physique, similar to that of Stone Age humans, can better handle life’s challenges and stressors in our modern world",
        ],
      },
      {
        title: "Avoids Wheat and Gluten",
        data: [
          "Going Paleo means cutting out wheat products, eliminating gluten. Even if you don’t have Celiac disease or gluten sensitivity, avoiding these foods can contribute to weight loss and improved digestion",
        ],
      },
    ],
  },
  {
    image: wholefoods_bg,
    name: "Whole Foods Diet",
    title: "Paleo",
    description:
      "Based on foods presumed to have been available to patheolithic humans, such as lean meats, fish, fruits, vegetables, nuts, and seeds",
    tags: [
      "Vegetables",
      "Whole grains",
      "Lean Proteins",
      "Healthy Fats",
      "Fruits",
    ],
    benefits: [
      {
        title: "Nutrient rich",
        data: [
          "Whole foods are naturally packed with essential nutrients. Fruits, vegetables, whole grains, lean meats (like chicken and fish), milk, yogurt, legumes, nuts, and seeds fall into this category, By choosing whole foods, you ensure a diverse intake of vitamins, minerals, and antioxidants",
        ],
      },
      {
        title: "Heart Health",
        data: [
          "Whole foods, such as fruits, vegetables, and whole grains, benefit cardiovascular health.They lower blood pressure and reduce the risk of heart disease",
        ],
      },
      {
        title: "Type 2 Diabetes Prevention",
        data: [
          "The fiber content in whole foods stabilizes blood sugar levels and enhances insulin sensitivity.This can help prevent type 2 diabetes",
        ],
      },
    ],
  },
];

const data = Array(10)
  .fill(0)
  .map((item, index) => ({
    _id: index,
  }));

const MoreInfoModal = ({ viewingMore, setViewingMore, planToView }: any) => {
  return (
    <Modal transparent animationType="slide" visible={viewingMore}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        {/* BACK BUTTON */}
        <View
          style={{
            position: "absolute",
            top: Platform.select({ ios: 50, android: 35 }),
            paddingHorizontal: 10,
          }}
        >
          <Pressable
            onPress={() => setViewingMore(false)}
            style={{
              backgroundColor: "white",
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
          >
            <Ionicons size={20} name="arrow-back" />
          </Pressable>
        </View>
        <Image
          resizeMode="cover"
          style={{
            width: "100%",
            height: 300,
            alignSelf: "center",
            position: "absolute",
            top: 0,
            zIndex: -1,
          }}
          source={planToView?.image}
        />

        <ScrollView
          // showsVerticalScrollIndicator={false}
          style={{
            marginTop: 300,
            // paddingHorizontal: 8,
            paddingTop: 10,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={[styles.dietNameText]}>{planToView?.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color={Colors.primary} />
              <Ionicons name="star" size={18} color={Colors.primary} />
              <Ionicons name="star" size={18} color={Colors.primary} />
              <Ionicons name="star" size={18} color={Colors.primary} />
              <Ionicons name="star-outline" size={18} color={Colors.primary} />
            </View>
            <View style={styles.allIngredientsContainer}>
              {planToView?.tags?.map((tag: string, index: number) => (
                <IngredientTag key={index} title={tag} />
              ))}
            </View>
            <Text
              style={{
                fontFamily: REGULAR,
                fontSize: 17,
                marginTop: 16,
                color: "gray",
              }}
            >
              {planToView?.description}
            </Text>
          </View>
          <HorizontalRule marginTop={20} />
          <View
            style={{
              flex: 1,
              paddingBottom: 50,
              paddingHorizontal: 10,
              paddingTop: 20,
            }}
          >
            <Text style={[styles.dietNameText]}>Benefits</Text>

            <SectionList
              scrollEnabled={false}
              sections={
                planToView ? planToView?.benefits : dietPlans[0].benefits
              }
              renderItem={({ item }) => (
                <Text style={{ fontSize: 16, lineHeight: 24, color: "gray" }}>
                  {item}
                </Text>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: SEMI_BOLD,
                      color: Colors.dark,
                      marginVertical: 8,
                    }}
                  >
                    {title}:
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export const DietBrowser = () => {
  const [viewingMore, setViewingMore] = React.useState(false);
  const [planToView, setPlanToView] = React.useState<any>(null);
  function handleViewMore(plan: any) {
    setViewingMore(true);
    setPlanToView(plan);
  }
  return (
    <>
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          backgroundColor: "white",
          paddingTop: 10,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dietPlans}
          renderItem={({ item: plan }) => (
            <DietPlanCard
              image={plan.image}
              name={plan.name}
              tags={plan.tags}
              handlePress={() => handleViewMore(plan)}
            />
          )}
        />
      </View>
      <MoreInfoModal
        planToView={planToView}
        viewingMore={viewingMore}
        setViewingMore={setViewingMore}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "98%",
    // borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    // borderColor: Colors.primary,
    marginBottom: 20,
    gap: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    borderRadius: 15,
    opacity: 0.4,
    // zIndex: -10,
  },
  dietNameText: {
    fontWeight: "600",
    fontSize: 24,
    color: Colors.dark,
    fontFamily: SEMI_BOLD,
  },
  ratingContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    backgroundColor: "white",
    width: 100,
  },
  allIngredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    zIndex: 10,
    paddingTop: 8,
  },
  ingerdientTagContainer: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ingerdientTagText: {
    color: "white",
    fontWeight: "600",
  },
  dietImage: {
    width: 200,
    height: 300,
  },
  dietImageContainer: {
    alignItems: "center",
    // borderWidth: 2,
  },
  moreInfotext: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    color: "white",
  },
});
