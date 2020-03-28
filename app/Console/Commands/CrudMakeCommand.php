<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Composer;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class CrudMakeCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'make:crud';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create all necessary server-side resource stubs';

    /**
     * The Composer instance.
     *
     * @var \Illuminate\Support\Composer
     */
    protected $composer;

    /**
     * Stubs to generate
     *
     * @var array
     */
    protected $stubs = [
        'Model' => [
            'stub' => 'model',
        ],
        'Controller' => [
            'stub' => 'controller',
            'namespace' => '\Http\Controllers'
        ],
        'Policy' => [
            'stub' => 'policy',
            'namespace' => '\Policies'
        ],
        'StoreRequest' => [
            'stub' => 'request',
            'namespace' => '\Http\Requests'
        ],
        'UpdateRequest' => [
            'stub' => 'request',
            'namespace' => '\Http\Requests'
        ],
        'Resource' => [
            'stub' => 'resource',
            'namespace' => '\Http\Resources'
        ],
    ];

    /**
     * Create a new command instance.
     *
     * @param  \Illuminate\Filesystem\Filesystem  $files
     * @param  \Illuminate\Support\Composer  $composer
     * @return void
     */
    public function __construct(Filesystem $files, Composer $composer)
    {
        parent::__construct($files);

        $this->composer = $composer;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        /**
         * Generate resource files
         */
        collect($this->stubs)->each(function ($name, $type) {
            $this->type = $type;

            parent::handle();
        });

        /**
         * Generate resource migration
         */
        $this->createMigration();
    }

    /**
     * @inheritDoc
     */
    protected function getStub()
    {
        $stub = $this->stubs[$this->type]['stub'];

        if ($stub === 'model') {
            /**
             * Take specific stubs
             */
            if (!$this->isMediable() && $this->isTranslatable()) {
                $stub .= '.translatable';
            }
            if ($this->isMediable() && !$this->isTranslatable()) {
                $stub .= '.mediable';
            }
            if (!$this->isMediable() && !$this->isTranslatable()) {
                $stub .= '.plain';
            }
        }

        return __DIR__."/stubs/{$stub}.stub";
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.($this->stubs[$this->type]['namespace'] ?? null);
    }

    private function isMediable()
    {
        return !empty($this->option('mediable'));
    }

    private function isTranslatable()
    {
        return !empty($this->option('translatable'));
    }

    /**
     * Replace the class name for the given stub.
     *
     * @param  string  $stub
     * @param  string  $name
     * @return string
     */
    protected function replaceClass($stub, $name)
    {
        $class = parent::replaceClass($stub, $name);

        return str_replace(['{{ fields }}', '{{ casts }}', '{{ translatable }}', '{{ searchable }}', '{{ sortable }}', '{{ mediable }}'], [
            $this->getArrayString($this->getFields()->keys()),
            $this->getArrayWithKeysString($this->getCasts()),
            $this->getArrayString($this->getTranslatableFields()),
            $this->getArrayString($this->getSearchableFields()),
            $this->getArrayString($this->getSortableFields()),
            $this->getMediaCodeLines($this->getMediableFields()),
        ], $class);
    }

    private function getFields()
    {
        return collect($this->option('fields'))->mapWithKeys(function ($field) {
            $segments = explode(':', $field);
            return [$segments[0] => $segments[1]];
        });
    }
    private function getTranslatableFields()
    {
        return collect($this->option('translatable'));
    }

    private function getSearchableFields()
    {
        return collect($this->option('searchable'));
    }

    private function getSortableFields()
    {
        return collect($this->option('sortable'));
    }

    private function getMediableFields()
    {
        return collect($this->option('mediable'))->mapWithKeys(function ($field) {
            $segments = explode(':', $field);
            return [$segments[0] => $segments[1]];
        });
    }


    private function getCasts()
    {
        return collect($this->getFields())->filter(function ($type) {
            return in_array($type, [
                'integer',
                'real',
                'float',
                'double',
                'decimal',
                'boolean',
                'object',
                'array',
                'collection',
                'date',
                'datetime',
                'timestamp'
            ]);
        })->map(function ($type) {
            if ($type === 'decimal') {
                return "$type:2";
            }
            return $type;
        });
    }

    private function getMediaCodeLines($array)
    {
        return collect($array)->map(function ($multiple, $collection) {
            $line = "\$this->addMediaCollection('$collection')";
            if (!$multiple) {
                $line .= '->singleFile()';
            }
            return "$line;";
        })->implode("\n        ");
    }

    private function getArrayString($array)
    {
        return collect($array)->map(function ($item) {
            return "'$item'";
        })->values()->implode(', ');
    }

    private function getArrayWithKeysString($array)
    {
        return collect($array)->map(function ($item, $key) {
            return "'$key' => '$item'";
        })->values()->implode(', ');
    }

    /**
     * Create a migration file for the model.
     *
     * @return void
     */
    protected function createMigration()
    {
        $table = Str::snake(Str::pluralStudly(class_basename($this->argument('name'))));

        $this->call('make:migration', [
            'name' => "create_{$table}_table",
            '--create' => $table,
        ]);
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['name', InputArgument::REQUIRED, 'The name of the class'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['fields', 'f', InputOption::VALUE_OPTIONAL | InputOption::VALUE_IS_ARRAY, 'List of fields (field:type)'],
            ['mediable', 'm', InputOption::VALUE_OPTIONAL | InputOption::VALUE_IS_ARRAY, 'List of mediable fields (field:multiple)'],
            ['translatable', 't', InputOption::VALUE_OPTIONAL | InputOption::VALUE_IS_ARRAY, 'List of translatable fields'],
            ['searchable', 'sc', InputOption::VALUE_OPTIONAL | InputOption::VALUE_IS_ARRAY, 'List of searchable fields'],
            ['sortable', 'st', InputOption::VALUE_OPTIONAL | InputOption::VALUE_IS_ARRAY, 'List of sortable fields'],
            ['force', null, InputOption::VALUE_NONE, 'Create the class even if the model already exists'],
        ];
    }
}
