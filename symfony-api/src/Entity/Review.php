<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A review of a book.
 *
 * @ORM\Entity
 * @ApiResource(
 *     iri="http://schema.org/Review",
 *     normalizationContext={"groups"={"review:read"}}
 * )
 * @ApiFilter(OrderFilter::class, properties={"id", "publicationDate"})
 */
class Review
{
    /**
     * @var int The id of this review.
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var int The rating of this review (between 0 and 5).
     *
     * @ORM\Column(type="smallint")
     * @Assert\Range(min=0, max=5)
     * @Groups("review:read")
     */
    public $rating;

    /**
     * @var string the body of the review.
     *
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"book:read", "review:read"})
     * @ApiProperty(iri="http://schema.org/reviewBody")
     */
    public $body;

    /**
     * @var string The author of the review.
     *
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups("review:read")
     * @ApiProperty(iri="http://schema.org/author")
     */
    public $author;

    /**
     * @var \DateTimeInterface The date of publication of this review.
     *
     * @ORM\Column(type="datetime")
     * @Assert\NotNull
     * @Groups("review:read")
     * @ApiProperty(iri="http://schema.org/dateCreated")
     */
    public $publicationDate;

    /**
     * @var Book The book this review is about.
     *
     * @ORM\ManyToOne(targetEntity="Book", inversedBy="reviews")
     * @Assert\NotNull
     * @Groups("review:read")
     * @ApiProperty(iri="http://schema.org/itemReviewed")
     * @ApiFilter(SearchFilter::class)
     */
    public $book;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setBook(?Book $book, bool $updateRelation = true): void
    {
        $this->book = $book;
        if ($updateRelation) {
            $book->addReview($this, false);
        }
    }

    public function getBook(): ?Book
    {
        return $this->book;
    }
}
