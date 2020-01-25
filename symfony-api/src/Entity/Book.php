<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A book.
 *
 * @ORM\Entity
 * @ApiResource(
 *     iri="http://schema.org/Book",
 *     normalizationContext={"groups"={"book:read"}}
 * )
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(OrderFilter::class, properties={"id", "title", "author", "isbn", "publicationDate"})
 */
class Book
{
    /**
     * @var int The id of this book.
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string|null The ISBN of this book (or null if doesn't have one).
     *
     * @ORM\Column(nullable=true)
     * @Assert\Isbn
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/isbn")
     */
    public $isbn;

    /**
     * @var string The title of this book.
     *
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"book:read", "review:read"})
     * @ApiProperty(iri="http://schema.org/name")
     * @ApiFilter(SearchFilter::class, strategy="ipartial")
     */
    public $title;

    /**
     * @var string The description of this book.
     *
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/description")
     */
    public $description;

    /**
     * @var string The author of this book.
     *
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/author")
     * @ApiFilter(SearchFilter::class, strategy="ipartial")
     */
    public $author;

    /**
     * @var \DateTimeInterface The publication date of this book.
     *
     * @ORM\Column(type="date")
     * @Assert\NotNull
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/dateCreated")
     */
    public $publicationDate;

    /**
     * @var Review[] Available reviews for this book.
     *
     * @ORM\OneToMany(targetEntity="Review", mappedBy="book", orphanRemoval=true, cascade={"persist", "remove"})
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/reviews")
     * @ApiSubresource
     */
    public $reviews;

    /**
     * @var string|null The book's cover base64 encoded
     *
     * @Groups("book:cover")
     */
    public $cover;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function addReview(Review $review, bool $updateRelation = true): void
    {
        if ($this->reviews->contains($review)) {
            return;
        }

        $this->reviews->add($review);
        if ($updateRelation) {
            $review->setBook($this, false);
        }
    }

    public function removeReview(Review $review, bool $updateRelation = true): void
    {
        $this->reviews->removeElement($review);
        if ($updateRelation) {
            $review->setBook(null, false);
        }
    }

    /**
     * @return Collection|Review[]
     */
    public function getReviews(): iterable
    {
        return $this->reviews;
    }
}
