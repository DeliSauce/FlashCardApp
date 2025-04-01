// import React, { useState } from 'react';
// import { View, Text, Button, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';

// export default function NewCollectionScreen() {

    
//     return (
//         <SafeAreaView style={styles.container}>
//             <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={styles.container}
//             >
//             <ScrollView style={styles.scrollView}>
//                 <View style={styles.header}>
//                 <Text style={styles.title}>Create Card Collection</Text>
//                 </View>

//                 <View style={styles.formGroup}>
//                 <Text style={styles.label}>Collection Title</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={collectionTitle}
//                     onChangeText={setCollectionTitle}
//                     placeholder="Enter collection title"
//                 />
//                 </View>

//                 <Text style={styles.sectionTitle}>Cards</Text>
                
//                 {cards.map((card, index) => (
//                 <View key={index} style={styles.cardContainer}>
//                     <View style={styles.cardHeader}>
//                     <Text style={styles.cardTitle}>Card {index + 1}</Text>
//                     {cards.length > 1 && (
//                         <TouchableOpacity
//                         onPress={() => removeCard(index)}
//                         style={styles.removeButton}
//                         >
//                         <Text style={styles.removeButtonText}>Remove</Text>
//                         </TouchableOpacity>
//                     )}
//                     </View>

//                     <View style={styles.formGroup}>
//                     <Text style={styles.label}>Question</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={card.question}
//                         onChangeText={(value) => updateCard(index, 'question', value)}
//                         placeholder="Enter question"
//                         multiline
//                     />
//                     </View>

//                     <View style={styles.formGroup}>
//                     <Text style={styles.label}>Answer</Text>
//                     <TextInput
//                         style={[styles.input, styles.multilineInput]}
//                         value={card.answer}
//                         onChangeText={(value) => updateCard(index, 'answer', value)}
//                         placeholder="Enter answer"
//                         multiline
//                         numberOfLines={4}
//                     />
//                     </View>

//                     <View style={styles.formGroup}>
//                     <Text style={styles.label}>Link (Optional)</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={card.link}
//                         onChangeText={(value) => updateCard(index, 'link', value)}
//                         placeholder="Enter reference link"
//                     />
//                     </View>

//                     <View style={styles.formGroup}>
//                     <Text style={styles.label}>Topic</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={card.topic}
//                         onChangeText={(value) => updateCard(index, 'topic', value)}
//                         placeholder="Enter topic"
//                     />
//                     </View>

//                     <View style={styles.formGroup}>
//                     <Text style={styles.label}>Orientation</Text>
//                     <View style={styles.pickerContainer}>
//                         <Picker
//                         selectedValue={card.orientation}
//                         onValueChange={(value) => updateCard(index, 'orientation', value)}
//                         style={styles.picker}
//                         >
//                         <Picker.Item label="Portrait" value="portrait" />
//                         <Picker.Item label="Landscape" value="landscape" />
//                         </Picker>
//                     </View>
//                     </View>
//                 </View>
//                 ))}

//                 <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={addCard}
//                 >
//                 <Text style={styles.addButtonText}>+ Add Another Card</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                 style={styles.submitButton}
//                 onPress={handleSubmit}
//                 >
//                 <Text style={styles.submitButtonText}>Create Collection</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     },
//     scrollView: {
//     flex: 1,
//     padding: 16,
//     },
//     header: {
//     marginBottom: 24,
//     },
//     title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     },
//     sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 16,
//     marginBottom: 8,
//     color: '#333',
//     },
//     formGroup: {
//     marginBottom: 16,
//     },
//     label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#555',
//     },
//     input: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     },
//     multilineInput: {
//     minHeight: 100,
//     textAlignVertical: 'top',
//     },
//     pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     },
//     picker: {
//     height: 50,
//     },
//     cardContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     },
//     cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//     },
//     cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     },
//     removeButton: {
//     padding: 8,
//     },
//     removeButtonText: {
//     color: '#e74c3c',
//     fontWeight: '600',
//     },
//     addButton: {
//     padding: 16,
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderStyle: 'dashed',
//     marginBottom: 24,
//     },
//     addButtonText: {
//     color: '#3498db',
//     fontSize: 16,
//     fontWeight: '600',
//     },
//     submitButton: {
//     backgroundColor: '#3498db',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 40,
//     },
//     submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     },
// });
    