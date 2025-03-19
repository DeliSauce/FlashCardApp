import React, { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {gemini} from "@/services/ai";
import {geminiMockResponse, geminiTest2} from "@/tests/mocks";

const CreateScreen = () => {
    // const queryAddendum = "make the following into a flash card"
    // console.log("MOCK: ", geminiMockResponse)
    const [query, setQuery] = useState<string | undefined>("What's the difference between async/await and Promises?");
    const [results, setResults] = useState<string | undefined | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined | null>(null);

    const handleQuerySubmit = async () => {
        if (!query || !query.trim()) {
            setError('Please enter a search query');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await gemini.query({prompt: query});
            console.log('RESPONSE type: ', typeof response.Answer)
            console.log('RESPONSE: ', response)
            console.log("Answer: ", response.Answer)
            setResults(response.Answer);
            let temp;
            // setResults("test test");
        } catch (err) {
            setError(`Error: ${err}`);
            setResults(null);
        } finally {
            setIsLoading(false);
        }
    };

    const renderResults = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0066cc" />
                    <Text style={styles.loadingText}>Loading results...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

        if (!results) {
            return (
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderText}>
                        Enter a query and press the Search button to see results
                    </Text>
                </View>
            );
        }

        console.log('should show results: ', results)

        return (
            <ScrollView style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>Search Results:</Text>
                <View>
                    <Markdown>{results}</Markdown>
                </View>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidContainer}
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>API Query Tool</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your search query"
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                        onSubmitEditing={handleQuerySubmit}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleQuerySubmit}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.resultsWrapper}>
                    {renderResults()}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#0066cc',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        height: 46,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 6,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        fontSize: 16,
    },
    button: {
        marginLeft: 12,
        backgroundColor: '#0066cc',
        paddingHorizontal: 16,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resultsWrapper: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666666',
    },
    errorContainer: {
        padding: 16,
        backgroundColor: '#ffebee',
        borderRadius: 6,
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 16,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    resultsContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333333',
    },
    resultItem: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    resultDescription: {
        fontSize: 14,
        color: '#666666',
    },
    jsonResults: {
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        fontSize: 14,
    },
});

export default CreateScreen;