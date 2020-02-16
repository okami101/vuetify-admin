<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Book;

final class ReviewsTest extends ApiTestCase
{
    public function testFilterReviewsByBook(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(Book::class, ['isbn' => '9786644879585']);

        $response = $client->request('GET', "/reviews?book=$iri");
        $this->assertCount(2, $response->toArray()['hydra:member']);
    }

    public function testBookSubresource(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(Book::class, ['isbn' => '9786644879585']);

        $response = $client->request('GET', "$iri/reviews");
        $this->assertCount(2, $response->toArray()['hydra:member']);
    }
}
