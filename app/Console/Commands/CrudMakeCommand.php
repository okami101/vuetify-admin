<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
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
     * Stubs to generate
     *
     * @var array
     */
    protected $stubs = [
        'Model' => 'model',
        'Migration' => 'migration',
        'Factory' => 'factory',
        'Seeder' => 'seeder',
        'Controller' => 'controller',
        'Policy' => 'policy',
        'StoreRequest' => 'request',
        'UpdateRequest' => 'request',
        'Resource' => 'resource',
    ];

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        collect($this->stubs)->each(function ($name, $type) {
            $this->type = $type;

            parent::handle();
            dd('ok model');
        });
    }

    /**
     * @inheritDoc
     */
    protected function getStub()
    {
        $stub = $this->stubs[$this->type];

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

        return str_replace(['{{ fields }}', '{{ casts }}', '{{ translatable }}', '{{ mediable }}'], [
            $this->getArrayString($this->getFields()->keys()->toArray()),
            $this->getArrayWithKeysString($this->getCasts()->toArray()),
            $this->getArrayString($this->getTranslatableFields()->toArray()),
            $this->getMediaCodeLines($this->getMediableFields()->toArray()),
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

    private function getMediaCodeLines(array $array)
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
        ];
    }
}
