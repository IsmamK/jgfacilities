// database.js
import { addRxPlugin } from 'rxdb';
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStoragePouch } from 'rxdb/plugins/storage-pouch';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

// Add PouchDB storage plugin
addRxPlugin(getRxStoragePouch);
// Add DevMode plugin for easier development (optional)
addRxPlugin(RxDBDevModePlugin);

const initDatabase = async () => {
  // Create a new database or connect to an existing one
  const db = await createRxDatabase({
    name: 'pagedone', // Database name
    storage: getRxStoragePouch(), // Use PouchDB for storage
  });

  // Define the AboutPage schema
  await db.addCollections({
    aboutPage: {
      schema: {
        title: 'aboutPage schema',
        version: 0,
        type: 'object',
        properties: {
          about1Component: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              image1: { type: 'string' },
              image2: { type: 'string' },
            },
            required: ['title', 'description', 'image1', 'image2'],
          },
          about2Component: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              stats: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                  },
                  required: ['title', 'description'],
                },
              },
              buttonLabel: { type: 'string' },
              imageUrl: { type: 'string' },
            },
            required: ['title', 'description', 'stats', 'buttonLabel', 'imageUrl'],
          },
          faqComponent: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              subtitle: { type: 'string' },
              faqs: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    question: { type: 'string' },
                    answer: { type: 'string' },
                  },
                  required: ['question', 'answer'],
                },
              },
            },
            required: ['title', 'subtitle', 'faqs'],
          },
          teamComponent: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                position: { type: 'string' },
                imageUrl: { type: 'string' },
              },
              required: ['id', 'name', 'position', 'imageUrl'],
            },
          },
        },
        required: ['about1Component', 'about2Component', 'faqComponent', 'teamComponent'],
      },
    },
    projectPage: {
      schema: {
        title: 'projectPage schema',
        version: 0,
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            description: { type: 'string' },
            imageUrl: { type: 'string' },
          },
          required: ['id', 'title', 'description', 'imageUrl'],
        },
      },
    },
    galleryPage: {
      schema: {
        title: 'galleryPage schema',
        version: 0,
        type: 'array',
        items: {
          type: 'object',
          properties: {
            image: { type: 'string' },
            subtitle: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['image', 'subtitle', 'title', 'description'],
        },
      },
    },
    contactPage: {
      schema: {
        title: 'contactPage schema',
        version: 0,
        type: 'object',
        properties: {
          contact1Component: {
            type: 'object',
            properties: {
              header: { type: 'string' },
              subHeader: { type: 'string' },
              buttonText: { type: 'string' },
              emailLabel: { type: 'string' },
              phoneLabel: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              locations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    country: { type: 'string' },
                    address: { type: 'string' },
                    imgSrc: { type: 'string' },
                  },
                  required: ['country', 'address', 'imgSrc'],
                },
              },
            },
            required: ['header', 'subHeader', 'buttonText', 'emailLabel', 'phoneLabel', 'email', 'phone', 'locations'],
          },
          contact2Component: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              subtitle: { type: 'string' },
              phone: { type: 'string' },
              email: { type: 'string' },
              address: { type: 'string' },
              imageUrl: { type: 'string' },
            },
            required: ['title', 'subtitle', 'phone', 'email', 'address', 'imageUrl'],
          },
        },
        required: ['contact1Component', 'contact2Component'],
      },
    },
  });

  return db;
};

export default initDatabase;
