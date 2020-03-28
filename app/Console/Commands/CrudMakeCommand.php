<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
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

        dd($this->getFields());
        return str_replace(['{{ fields }}', '{{ casts }}'], [
            $this->getArrayString($this->getFields()),
            $this->getArrayWithKeysString($this->getCasts()),
        ], $class);
    }

    private function getFields()
    {
        return collect($this->option('fields'))->mapWithKeys(function ($field) {
            $segments = explode(':', $field);
            return [$segments[0] => $segments[1]];
        });
    }

    private function getCasts()
    {
        return collect($this->option('fields'))->map(function ($field) {
            return explode(':', $field);
        })->filter(function ($field) {
            return explode(':', $field)[0];
        })->toArray();
    }

    private function getArrayString($array)
    {
        return implode(', ', array_map(function ($item) {
            return "'$item'";
        }, $array));
    }

    private function getArrayWithKeysString($array)
    {
        return implode(', ', array_map(function ($item) {
            return "'$item'";
        }, $array));
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
