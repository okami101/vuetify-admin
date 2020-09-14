<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => [
                    'en' => 'Comics',
                    'fr' => 'BD',
                ],
                'children' => [
                    [
                        'name' => [
                            'en' => 'Marvel',
                            'fr' => 'Marvel',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Detective Comics',
                            'fr' => 'Detective Comics',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Manga',
                            'fr' => 'Manga',
                        ],
                    ],
                ],
            ],
            [
                'name' => [
                    'en' => 'Novel',
                    'fr' => 'Roman',
                ],
                'children' => [
                    [
                        'name' => [
                            'en' => 'Thriller',
                            'fr' => 'Thriller',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Adventure',
                            'fr' => 'Aventure',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Fantasy',
                            'fr' => 'Fantastique',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'SF',
                            'fr' => 'SF',
                        ],
                    ],
                ],
            ],
            [
                'name' => [
                    'en' => 'Culture',
                    'fr' => 'Culture',
                ],
                'children' => [
                    [
                        'name' => [
                            'en' => 'History',
                            'fr' => 'Histoire',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Biography',
                            'fr' => 'Biographie',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Cinema',
                            'fr' => 'Cinéma',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Music',
                            'fr' => 'Musique',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Politics',
                            'fr' => 'Politique',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Economy',
                            'fr' => 'Economie',
                        ],
                    ],
                ],
            ],
            [
                'name' => [
                    'en' => 'Life',
                    'fr' => 'Vie',
                ],
                'children' => [
                    [
                        'name' => [
                            'en' => 'Cook',
                            'fr' => 'Cuisine',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Eroticism',
                            'fr' => 'Eroticisme',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Health',
                            'fr' => 'Santé',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'DIY',
                            'fr' => 'Bricolage',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Sports',
                            'fr' => 'Sports',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Travel',
                            'fr' => 'Voyage',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Animals',
                            'fr' => 'Animaux',
                        ],
                    ],
                ],
            ],
            [
                'name' => [
                    'en' => 'Knowledge',
                    'fr' => 'Savoir',
                ],
                'children' => [
                    [
                        'name' => [
                            'en' => 'School',
                            'fr' => 'Ecole',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Dictionary',
                            'fr' => 'Dictionnaires',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Languages',
                            'fr' => 'Langues',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Law',
                            'fr' => 'Droit',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Science',
                            'fr' => 'Science',
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Computer science',
                            'fr' => 'Informatique',
                        ],
                        'children' => [
                            [
                                'name' => [
                                    'en' => 'Hardware',
                                    'fr' => 'Matériel',
                                ],
                            ],
                            [
                                'name' => [
                                    'en' => 'Software',
                                    'fr' => 'Logiciel',
                                ],
                            ],
                        ],
                    ],
                    [
                        'name' => [
                            'en' => 'Business',
                            'fr' => 'Entreprise',
                        ],
                    ],
                ],
            ],
        ];

        foreach ($categories as $category) {
            $parent = Category::create([
                'type' => 'book',
                'name' => $category['name'],
            ]);

            if (! empty($category['children'])) {
                foreach ($category['children'] as $child) {
                    $subParent = $parent->children()->create([
                        'type' => 'book',
                        'name' => $child['name'],
                    ]);

                    if (! empty($child['children'])) {
                        $subParent->children()->createMany(
                            collect($child['children'])
                                ->map(function ($item) {
                                    return [
                                        'type' => 'book',
                                        'name' => $item['name'],
                                    ];
                                })
                                ->toArray()
                        );
                    }
                }
            }
        }
    }
}
