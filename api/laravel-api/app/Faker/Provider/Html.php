<?php

namespace App\Faker\Provider;

use Faker\Generator;
use Faker\Provider\Base;

class Html extends Base
{
    /**
     * Generate rich body.
     *
     * @param Generator|\Faker\UniqueGenerator $faker
     *
     * @return string
     */
    public function htmlParagraphs($min = 1, $max = 5, $sentences = 10): string
    {
        $html = '';

        /*
         *  Generate many paragraphs
         */
        for ($k = 0; $k < $this->generator->numberBetween($min, $max); $k++) {
            $paragraph = $this->generator->paragraph($sentences);
            $html .= "<p>$paragraph</p>";
        }

        return $html;
    }
}
