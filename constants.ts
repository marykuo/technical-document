
import { ComparisonData } from './types';

export const JUNIT_DATA: ComparisonData = {
  'JUnit 4': {
    version: 'JUnit 4',
    overview: 'The legacy standard for Java testing for over a decade. Built on top of reflections and custom runners.',
    dependencies: {
      maven: `<dependency>\n  <groupId>junit</groupId>\n  <artifactId>junit</artifactId>\n  <version>4.13.2</version>\n  <scope>test</scope>\n</dependency>`,
      gradle: `testImplementation 'junit:junit:4.13.2'`,
    },
    assertions: [
      {
        title: 'Basic Assertions',
        description: 'Static methods from org.junit.Assert class.',
        snippets: [{
          language: 'java',
          label: 'Example',
          code: `assertEquals(expected, actual);\nassertTrue(condition);\nassertNull(object);`
        }]
      }
    ],
    assumptions: [
      {
        title: 'Assume Class',
        description: 'Used to halt tests if conditions aren\'t met.',
        snippets: [{
          language: 'java',
          label: 'Example',
          code: `Assume.assumeTrue(System.getProperty("os.name").contains("Windows"));`
        }]
      }
    ],
    annotations: [
      {
        title: 'Lifecycle Annotations',
        description: 'Basic markers for test orchestration.',
        list: [
          '@Test - Mark a method as test',
          '@Before - Setup before each test',
          '@After - Cleanup after each test',
          '@BeforeClass - Setup once for all tests',
          '@AfterClass - Cleanup once for all tests',
          '@Ignore - Skip a test'
        ]
      }
    ]
  },
  'JUnit 5': {
    version: 'JUnit 5',
    overview: 'The current generation. Modular architecture (Platform + Jupiter + Vintage). Supports Java 8 features like Lambdas.',
    dependencies: {
      maven: `<dependency>\n  <groupId>org.junit.jupiter</groupId>\n  <artifactId>junit-jupiter</artifactId>\n  <version>5.10.0</version>\n  <scope>test</scope>\n</dependency>`,
      gradle: `testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'`,
    },
    assertions: [
      {
        title: 'Jupiter Assertions',
        description: 'Enhanced assertions with support for lambdas and grouped assertions.',
        snippets: [{
          language: 'java',
          label: 'Example',
          code: `Assertions.assertEquals(expected, actual, () -> "Failure message");\nAssertions.assertAll(\n  () -> assertEquals(1, 1),\n  () -> assertEquals(2, 2)\n);`
        }]
      }
    ],
    assumptions: [
      {
        title: 'Jupiter Assumptions',
        description: 'Functional style assumptions.',
        snippets: [{
          language: 'java',
          label: 'Example',
          code: `Assumptions.assumeTrue(val > 0, () -> "Value must be positive");`
        }]
      }
    ],
    annotations: [
      {
        title: 'Jupiter Lifecycle',
        description: 'More descriptive and flexible annotations.',
        list: [
          '@Test - Mark method as test',
          '@BeforeEach - Successor to @Before',
          '@AfterEach - Successor to @After',
          '@BeforeAll - Successor to @BeforeClass',
          '@AfterAll - Successor to @AfterClass',
          '@Disabled - Successor to @Ignore',
          '@DisplayName - Custom names for tests'
        ]
      }
    ]
  },
  'JUnit 6': {
    version: 'JUnit 6',
    overview: 'A speculative future-oriented version focusing on native cloud integration, parallel execution by default, and deep AOT support.',
    dependencies: {
      maven: `<dependency>\n  <groupId>org.junit.next</groupId>\n  <artifactId>junit-core</artifactId>\n  <version>6.0.0-M1</version>\n</dependency>`,
      gradle: `testImplementation 'org.junit.next:junit-core:6.0.0-M1'`,
    },
    assertions: [
      {
        title: 'Reactive Assertions',
        description: 'Native support for asynchronous and reactive stream verification.',
        snippets: [{
          language: 'java',
          label: 'Example',
          code: `Assert.that(publisher)\n  .emits(1, 2, 3)\n  .completesWithin(Duration.ofSeconds(1));`
        }]
      }
    ],
    assumptions: [
      {
        title: 'Environment Sensing',
        description: 'Declarative assumptions based on container or cloud environment state.',
        snippets: [{
          language: 'java',
          label: 'Example',
          code: `@RequiresResource(Database.class)\n@AssumeCloud(Provider.AWS)`
        }]
      }
    ],
    annotations: [
      {
        title: 'Declarative Extensions',
        description: 'Implicit behavior through powerful meta-annotations.',
        list: [
          '@Scenario - Behavioral test definitions',
          '@Feature - Grouping by business capability',
          '@AutoMock - Integrated automated mocking',
          '@NativeTest - Optimized for GraalVM/Native images',
          '@Parallel - High-concurrency orchestration'
        ]
      }
    ]
  }
};
